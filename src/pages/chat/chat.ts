import Block from '../../core/Block';
import template from './chat.hbs';
import * as styles from './chat.css';
import { Link } from '../../components/Link';
import renderDom from '../../core/renderDom';
import { Error, ErrorPage } from '../error/error';
import { chatsMock } from '../../mock/chats';
import { ChatPreview } from '../../components/ChatPreview';
import { ChatInput } from '../../components/ChatInput';
import { Router } from '../../core/router/Router';

const err404: ErrorPage = {
  number: 404,
  text: 'Не туда попали',
  link_text: 'Назад к чатам',
};

const err500: ErrorPage = {
  number: 500,
  text: 'Мы уже фиксим',
  link_text: 'Назад в будущее',
};

export class Chat extends Block {
  protected initChildren() {
    this.children.chat1 = new ChatPreview(chatsMock[0]);
    this.children.chat2 = new ChatPreview(chatsMock[1]);
    this.children.chat3 = new ChatPreview(chatsMock[2]);
    this.children.chat4 = new ChatPreview(chatsMock[3]);

    this.children.link404 = new Link({
      text: 'Page 404',
      className: 'link-button',
      events: {
        click: (e) => {
          e.preventDefault();
          renderDom('#app', new Error(err404));
        },
      },
    });

    this.children.link500 = new Link({
      text: 'Page 500',
      className: 'link-button',
      events: {
        click: (e) => {
          e.preventDefault();
          renderDom('#app', new Error(err500));
        },
      },
    });

    this.children.inputSearch = new ChatInput({
      name: 'search',
      placeholder: 'Поиск',
      autocomplete: 'on',
      className: 'sidebar-search',
    });

    this.children.inputMessage = new ChatInput({
      name: 'message',
      placeholder: 'Введите текст',
      autocomplete: 'off',
      className: 'message-input-label',
    });

    this.children.linkProfile = new Link({
      text: 'Профиль >',
      className: 'sidebar-profile_link',
      events: {
        click: (e) => {
          e.preventDefault();
          const router = new Router('#app');
          router.go('/settings');
        },
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { styles });
  }
}
