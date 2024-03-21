import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';

import { EventBus, type State } from 'shared/services';

type ExtendedHTMLElement = HTMLElement & {
  id?: string;
  content?: HTMLElement;
  getContent?: () => HTMLElement;
};

export type ComponentProps = {
  events?: Record<string, EventListener>;
  attr?: Record<string, string>;
  state?: State;
  [key: string | symbol]: unknown;
};

type MetaType = {
  tag: string;
  props: ComponentProps;
};

export class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  private _element: HTMLElement | null = null;

  private _meta: MetaType;

  private _id: string | null = null;

  private _children: ComponentProps = {};

  private _lists: ComponentProps = {};

  private _setUpdate: boolean = false;

  private _eventBus: () => EventBus;

  public props: ComponentProps = {};

  public constructor(tag: string = 'div', propsAndChildren: ComponentProps = {}) {
    const { children, props, lists } = this.getChildren(propsAndChildren);

    this._meta = {
      tag,
      props,
    };

    this._id = makeUUID();
    this._children = this._makePropsProxy(children);
    this._lists = this._makePropsProxy(lists);
    this.props = this._makePropsProxy({ ...props, _id: this._id });

    const eventBus = new EventBus();
    this._eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Component.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _init() {
    this._createResources();
    this._eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  private _createResources() {
    const { tag } = this._meta;
    this._element = this._createDocumentElement(tag);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  public componentDidMount() {}

  public dispatchComponentDidMount() {
    this._eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this._eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  public componentDidUpdate(_oldProps: ComponentProps, _newProps: ComponentProps) {
    return true;
  }

  public setProps = (nextProps: ComponentProps) => {
    if (!nextProps) {
      return;
    }

    this._setUpdate = false;

    const oldProps = { ...this.props };

    const { children, props, lists } = this.getChildren(nextProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }

    if (Object.values(lists).length) {
      Object.assign(this._lists, lists);
    }

    if (this._setUpdate) {
      this._eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, this.props);
      this._setUpdate = false;
    }
  };

  get element() {
    return this._element;
  }

  private _render() {
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
  public render() {}

  private _makePropsProxy(props: ComponentProps) {
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

  private _createDocumentElement(tag: string): ExtendedHTMLElement {
    return document.createElement(tag);
  }

  public addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  public removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  public addAttributes() {
    const { attr } = this.props;

    if (attr && typeof attr === 'object') {
      Object.entries(attr).forEach(([key, value]) => {
        this._element?.setAttribute(key, value as string);
      });
    }
  }

  public getContent() {
    return this.element;
  }

  public getChildren(propsAndChildren: ComponentProps) {
    const children: ComponentProps = {};
    const props: ComponentProps = {};
    const lists: ComponentProps = {};

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

  public compile(template: string, props?: ComponentProps) {
    if (typeof props === 'undefined') {
      props = this.props;
    }

    const propsAndStubs: Record<string, unknown> = { ...props };

    (Object.entries(this._children) as [key: string, child: ExtendedHTMLElement][]).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    Object.entries(this._lists).forEach(([key]) => {
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

  public hide() {
    if (this._element) {
      this._element.remove();
    }
  }
}
