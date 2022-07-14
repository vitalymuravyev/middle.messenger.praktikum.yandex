import EventBus from './EventBus';
import { v4 as uuidv4 } from 'uuid';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_RENDER: 'flow:render',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
  };

  private _element: HTMLElement | null = null;
  protected _meta: any;
  private eventBus: () => EventBus;
  props: any;
  children: any;
  id = uuidv4();

  protected constructor(propsAndChildren = {}) {
    const eventBus = new EventBus();

    const { props, children } = this.getPropsAndChildren(propsAndChildren);
    console.log('props', props)
    this.children = children;

    this.initChildren(props);
    this._meta = { props };
    console.log(this.children)
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  getPropsAndChildren(propsAndChildren: any) {
    const props: any = {};
    const children: any = {};

    Object.entries(propsAndChildren).map(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every(i => i instanceof Block)) {
        children[key] = value
      } else {
        props[key] = value;
      }
    })

    return { props, children };
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    // eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
  }

  private _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];

        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target, prop, value) {
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
        return true
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      }
    })
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child: Block) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(odlProps: any, newProps: any) {
    const response = this.componentDidUpdate(odlProps, newProps);
    if (!response) return;

    this._render()
  }

  componentDidUpdate(_oldProps: any, _newProps: any) {
    return true
  }

  setProps = (nextProps: any) => {
    if (!nextProps) return;

    Object.assign(this.props, nextProps)
  }

  private _render() {
    const block = this.render();

    const newElement = block.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  private _addEvents() {
    const { events } = this.props;

    if (!events) return;

    Object.keys(events).forEach(event => this._element?.addEventListener(event, events[event]))
  }

  compile(template: (pr: any) => string, props: any): DocumentFragment {
    Object.entries(this.children).forEach(([key, child]: [string, Block]) => {
      if (Array.isArray(child)) {
        props[key] = child.map(item => `<div data-id="${item.id}"></div>`)
      }
      props[key] = `<div data-id="${child.id}"></div>`
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = template(props);

    console.log(fragment)

    Object.values(this.children).forEach((child: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      stub && stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  get element() {
    return this._element;
  }

  getContent(): HTMLElement {
    console.log(this.element)
    return <HTMLElement>this.element;
  }

  protected initChildren(props = {}) {
    this.props = props;
  }
}