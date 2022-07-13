import Block from '../../core/Block';
import template from './chat.hbs';
import * as styles from './chat.css';
import { Link } from '../../components/Link/Link';

export class Chat extends Block {
  constructor() {
    super();
  }

  protected initChildren() {
    this.children.link404 = new Link({
      text: 'Page 404',
      className: 'link-button',
      events: {
        click: (e) => {
          e.preventDefault()
          // renderDom('#app', new Singup())
        },
      },
    });

    this.children.link500 = new Link({
      text: 'Page 500',
      className: 'link-button',
      events: {
        click: (e) => {
          e.preventDefault()
          // renderDom('#app', new Singup())
        },
      },
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, { styles })
  }
}