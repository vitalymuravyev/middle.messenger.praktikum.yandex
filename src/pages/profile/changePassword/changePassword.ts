import Block from '../../../core/Block';
import template from './changePassword.hbs';
import { Label } from '../../../components/Label';
import { Input } from '../../../components/Input';
import {
  hideError, isFormValid, Rule, showError, validate,
} from '../../../utils/validator';
import { Button } from '../../../components/Button';
import { logFormData } from '../../../utils/logFormData';
import UserDataController from '../../../core/controllers/userDataController';
import { Link } from '../../../components/Link';
import { Router } from '../../../core/router/Router';

export class ChangePassword extends Block {
  constructor(props: any) {
    super(props);
  }

  protected initChildren() {
    this.children.inputPassword = new Input({
      name: 'oldPassword',
      type: 'password',
      text: 'Старый пароль',
    });

    this.children.labelPassword = new Label({
      name: 'oldPassword',
      text: 'Старый пароль',
    });

    this.children.inputNewPassword = new Input({
      name: 'newPassword',
      type: 'password',
      text: 'Новый пароль',
      events: {
        blur: (evt) => {
          validate(Rule.PASSWORD, evt.target as HTMLInputElement);
        },
        focus: () => {
          hideError();
        },
      },
    });

    this.children.labelNewPassword = new Label({
      name: 'newPassword',
      text: 'Новый пароль',
    });

    this.children.buttonSave = new Button({
      text: 'Сохранить пароль',
      events: {
        click: (evt) => {
          evt.preventDefault();
          const isError = (document.querySelector('.input-error') as HTMLElement)?.textContent;
          if (isFormValid('.form-wrapper') && !isError) {
            const data = logFormData('.form-wrapper');
            UserDataController.changePassword(data as any);
          } else {
            showError('Все поля должны быть заполнены');
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
