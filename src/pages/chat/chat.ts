import Block from '../../core/Block';
import template from './chat.hbs';
import * as styles from './chat.css';
import { Link } from '../../components/Link/Link';
import renderDom from '../../core/renderDom';
import { Error, ErrorPage } from '../error/error';

const err404: ErrorPage = {
  number: 404,
  text: 'Не туда попали',
  link_text: 'Назад к чатам',
}

const err500: ErrorPage = {
  number: 500,
  text: 'Мы уже фиксим',
  link_text: 'Назад в будущее'
}

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
          renderDom('#app', new Error(err404))
        },
      },
    });

    this.children.link500 = new Link({
      text: 'Page 500',
      className: 'link-button',
      events: {
        click: (e) => {
          e.preventDefault()
          renderDom('#app', new Error(err500))
        },
      },
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, { styles })
  }
}