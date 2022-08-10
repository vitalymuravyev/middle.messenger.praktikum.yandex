import Block from '../../core/Block';
import template from './chat.hbs';
import * as styles from './chat.css';
import { Link } from '../../components/Link';
import { ChatPreview } from '../../components/ChatPreview';
import { ChatInput } from '../../components/ChatInput';
import { Router } from '../../core/router/Router';
import { Button } from '../../components/Button';
import { logFormData } from '../../utils/logFormData';
import ChatsController from '../../core/controllers/chatsController';
import { ChatOptions } from '../../components/ChatOptions';
import { Message } from '../../components/Message';

export class Chat extends Block {
  constructor(props: any) {
    super(props);
  }

  protected initChildren() {
    this.children.chatList = [];

    if (this.props?.chatsStore) {
      Object.values(this.props.chatsStore).map((value) => {
        const text = value.last_message?.content.length > 30 ? `${value.last_message?.content.slice(0,30)}...` : value.last_message?.content
        this.children.chatList.push(
          new ChatPreview({
            name: value.title,
            text: text,
            unreadNumber: value.unread_count,
            events: {
              click: (evt) => {
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

    this.children.messages = [];

    if (this.props?.currentChat) {
      this.props.currentChat.forEach((message) => {
        const date = new Date(message.time)
        const isMyMessage = message.user_id === this.props.currentUser.id;
        this.children.messages.push(
          new Message({
            content: message.content,
            time: `${date.getHours()}:${date.getMinutes()}`,
            className: isMyMessage ? 'message-outgoing' : 'message-incoming',
          })
        )
      })
    }

    // this.children.inputSearch = new ChatInput({
    //   name: 'search',
    //   placeholder: 'Поиск',
    //   autocomplete: 'on',
    //   className: 'sidebar-search',
    // });

    this.children.inputMessage = new ChatInput({
      name: 'message',
      placeholder: 'Введите текст',
      autocomplete: 'off',
      className: 'message-input-label',
    });

    this.children.buttonMessage = new Button({
      text: 'Send',
      events: {
        click: (evt) => {
          evt.preventDefault();
          const data = logFormData('.message-form');
          if (data?.message) {
            ChatsController.sendMessage({
              ...data,
              userId: this.props.currentUser.id,
              chatId: this.props.chatId,
              token: this.props.token,
            })
          }
        }
      }
    })

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
