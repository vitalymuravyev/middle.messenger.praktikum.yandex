import Block from '../../core/Block';
import template from './chatOptions.hbs';
import { Button } from '../Button';
import ChatsController from '../../core/controllers/chatsController';
import { ChatInput } from '../ChatInput';
import { logFormData } from '../../utils/logFormData';

export class ChatOptions extends Block {
  constructor(props: any) {
    super(props);
  }

  protected initChildren() {
    this.children.buttonRemoveChat = new Button({
      text: 'Remove chat',
      events: {
        click: () => {
          ChatsController.deleteChat(this.props.chatId);
        },
      },
    });

    this.children.inputUserId = new ChatInput({
      name: 'userId',
      autocomplete: 'off',
      className: 'user-id',
      placeholder: 'User',
    });

    this.children.buttonAddUser = new Button({
      text: 'Добавить пользователя',
      events: {
        click: (evt) => {
          evt.preventDefault();
          const data = logFormData('.add-remove-user');
          if (data?.userId) {
            ChatsController.addUser({
              chatId: this.props.chatId,
              users: [data.userId],
            });
          }
          (document.querySelector('.add-remove-user') as HTMLFormElement).reset();
        },
      },
    });

    this.children.buttonRemoveUser = new Button({
      text: 'Удалить пользователя',
      events: {
        click: (evt) => {
          evt.preventDefault();
          const data = logFormData('.add-remove-user');
          if (data?.userId) {
            ChatsController.deleteUser({
              chatId: this.props.chatId,
              users: [data.userId],
            });
            data.userId = '';
          }
        },
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
