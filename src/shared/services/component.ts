import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';

import EventBus from './event_bus';

type MetaType = {
  tag: string;
  props: Object;
};

type ExtendedHTMLElement = HTMLElement & {
  id?: string;
  content?: HTMLElement;
  getContent?: () => HTMLElement;
};

type Props = {
  events?: Record<string, EventListener>;
  attr?: Record<string, string>;
  [key: string | symbol]: unknown;
};

export default class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  _element: HTMLElement | null = null;

  _meta: MetaType;

  _id: string | null = null;

  _children: Props = {};

  _lists: Props = {};

  _props: Props = {};

  _setUpdate: boolean = false;

  eventBus: () => EventBus;

  /**
   * @param {string} tag
   * @param {Object} props
   * @returns {void}
   */
  constructor(tag = 'div', propsAndChildren = {}) {
    const { children, props, lists } = this.getChildren(propsAndChildren);

    const eventBus = new EventBus();
    this._meta = {
      tag,
      props,
    };

    this._id = makeUUID();
    this._children = this._makePropsProxy(children);
    this._lists = this._makePropsProxy(lists);
    this._props = this._makePropsProxy({ ...props, _id: this._id });

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Component.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const { tag } = this._meta;
    this._element = this._createDocumentElement(tag);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(_oldProps: Props, _newProps: Props) {
    return true;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    this._setUpdate = false;

    const oldProps = { ...this._props };

    const { children, props, lists } = this.getChildren(nextProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }

    if (Object.values(lists).length) {
      Object.assign(this._lists, lists);
    }

    if (this._setUpdate) {
      this.eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, this._props);
      this._setUpdate = false;
    }
  };

  get element() {
    return this._element;
  }

  _render() {
    const block: unknown = this.render();

    if (this._element) {
      this.removeEvents();
      this._element.innerHTML = '';
      this._element.appendChild(block as Node);
      this.addEvents();
      this.addAttributes();
    }
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  addEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  removeEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  addAttributes() {
    const { attr } = this._props;

    if (attr && typeof attr === 'object') {
      Object.entries(attr).forEach(([key, value]) => {
        this._element?.setAttribute(key, value as string);
      });
    }
  }

  getContent() {
    return this.element;
  }

  getChildren(propsAndChildren: Props) {
    const children: Props = {};
    const props: Props = {};
    const lists: Props = {};

    Object.keys(propsAndChildren).forEach((key) => {
      if (propsAndChildren[key] instanceof Component) {
        children[key] = propsAndChildren[key];
      } else if (Array.isArray(propsAndChildren[key])) {
        lists[key] = propsAndChildren[key];
      } else {
        props[key] = propsAndChildren[key];
      }
    });

    return { children, props, lists };
  }

  _makePropsProxy(props: Props) {
    let context = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? (value as CallableFunction).bind(target) : value;
      },
      set(target, prop, value) {
        if (target[prop] !== value) {
          target[prop] = value;
          context._setUpdate = true;
        }
        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  _createDocumentElement(tag: string): ExtendedHTMLElement {
    return document.createElement(tag);
  }

  compile(template: string, props?: Object) {
    if (typeof props === 'undefined') {
      props = this._props;
    }

    const propsAndStubs: Record<string, unknown> = { ...props };

    (Object.entries(this._children) as [key: string, child: ExtendedHTMLElement][]).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    Object.entries(this._lists).forEach(([key, _child]) => {
      propsAndStubs[key] = `<div data-id="${key}"></div>`;
    });

    const fragment: ExtendedHTMLElement = this._createDocumentElement('template');

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    (Object.values(this._children) as ExtendedHTMLElement[]).forEach((child) => {
      const stub = fragment.content?.querySelector(`[data-id="${child.id}"]`);

      if (stub && child.getContent) {
        stub.replaceWith(child.getContent());
      }
    });

    (Object.entries(this._lists) as [key: string, child: ExtendedHTMLElement[]][]).forEach(([key, child]) => {
      const stub = fragment.content?.querySelector(`[data-id="${key}"]`);

      if (!stub) {
        return;
      }

      let listContent = this._createDocumentElement('template');

      child.forEach((item) => {
        if (item instanceof Component) {
          listContent.content?.append(item.getContent());
        } else {
          listContent.content?.append(`${item}`);
        }
      });

      if (listContent.content) {
        stub.replaceWith(listContent.content);
      }
    });

    return fragment.content;
  }
}
