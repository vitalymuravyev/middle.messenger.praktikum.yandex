import Block from '../../../core/Block';
import * as template from './changeAvatar.hbs';
import { Button } from '../../../components/Button';
import UserDataController from '../../../core/controllers/userDataController';
import { Link } from '../../../components/Link';
import { Router } from '../../../core/router/Router';

export class ChangeAvatar extends Block<any> {
  constructor(props: any) {
    super(props);
  }

  protected initChildren() {
    this.children.buttonSave = new Button({
      text: 'Сохранить аватарку',
      events: {
        click: (evt) => {
          evt.preventDefault();
          const inputFile = document.getElementById('avatar') as HTMLInputElement;
          if (inputFile) {
            const data = new FormData();
            data.append('avatar', (inputFile as any).files[0]);
            UserDataController.changeAvatar(data);
          }
        },
      },
    });

    this.children.linkBack = new Link({
      text: 'Назад',
      className: 'link-button',
      events: {
        click: (e) => {
          e.preventDefault();
          const router = new Router('#app');
          router.back();
        },
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
