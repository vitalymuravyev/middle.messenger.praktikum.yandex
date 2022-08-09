import Block from '../../core/Block';
import template from './chat.hbs';
import * as styles from './chat.css';
import { Link } from '../../components/Link';
import renderDom from '../../core/renderDom';
import { Error, ErrorPage } from '../error/error';
import { ChatPreview } from '../../components/ChatPreview';
import { ChatInput } from '../../components/ChatInput';
import { Router } from '../../core/router/Router';
import { Button } from '../../components/Button';
import { logFormData } from '../../utils/logFormData';
import ChatsController from '../../core/controllers/chatsController';
import { ChatOptions } from '../../components/ChatOptions';

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
  constructor(props: any) {
    super(props);
  }

  protected initChildren() {
    this.children.chatList = [];

    if (this.props?.chatsStore) {
      Object.values(this.props.chatsStore).map((value) => {
        this.children.chatList.push(
          new ChatPreview({
            name: value.title,
            text: value.last_message,
            unreadNumber: value.unread_count,
            events: {
              click: (evt) => {
                console.log(value.id)
                ChatsController.getChat(value.id, this.props.currentUser.id)
              }
            }
          })
        )
      })
    }

    if (this.props?.token) {
      this.children.header = new ChatOptions({
        chatId: this.props.chatId
      })
    }

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

    this.children.buttonAddChat = new Button({
      text: 'Добавить чат',
      events: {
        click: (evt) => {
          evt.preventDefault()
          const data = logFormData('.add-chat');
          if (data?.title) {
            ChatsController.createChat(data);
          }
        }
      }
    })

    this.children.inputChatName = new ChatInput({
      name: 'title',
      placeholder: '',
      autocomplete: 'off',
      className: 'sidebar-search',
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { styles });
  }
}
