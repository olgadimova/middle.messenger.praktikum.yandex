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

export default class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  _element: ExtendedHTMLElement | null = null;

  _meta: MetaType;

  _id: string | null = null;

  _children: { [s: string]: ExtendedHTMLElement } | ArrayLike<ExtendedHTMLElement> = [];

  eventBus: () => EventBus;

  props: Record<string, unknown>;

  /**
   * @param {string} tag
   * @param {Object} props
   * @returns {void}
   */
  constructor(tag = 'div', props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tag,
      props,
    };

    this._id = makeUUID();
    this.props = this._makePropsProxy({ ...props, __id: this._id });

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

  _componentDidUpdate(oldProps: Object, newProps: Object) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: Object, newProps: Object) {
    return oldProps === newProps;
  }

  setProps = (nextProps: Object) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Component.EVENTS.FLOW_CDU);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block: unknown = this.render();

    if (this._element) {
      this._element.innerHTML = '';
      this._element.appendChild(block as Node);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Record<string | symbol, unknown>) {
    const proxyData = new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;
        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });

    return proxyData;
  }

  _createDocumentElement(tag: string): HTMLElement {
    return document.createElement(tag);
  }

  compile(template: string, props?: Object) {
    if (typeof props === 'undefined') {
      props = this.props;
    }

    const propsAndStubs: Record<string, unknown> = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment: ExtendedHTMLElement = this._createDocumentElement('template');

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach((child) => {
      const stub = fragment.content?.querySelector(`[data-id="${child.id}"]`);

      if (stub && child.getContent) {
        stub.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }
}
