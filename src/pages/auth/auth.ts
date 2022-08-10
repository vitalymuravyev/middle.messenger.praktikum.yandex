import template from './auth.hbs';
import { Button } from '../../components/Button';
import Block from '../../core/Block';

import * as styles from './auth.css';
import { Input } from '../../components/Input';
import { Link } from '../../components/Link';
import { logFormData } from '../../utils/logFormData';
import { Label } from '../../components/Label';
import {
  hideError, isFormValid, Rule, showError, validate,
} from '../../utils/validator';
import { Router } from '../../core/router/Router';
import AuthController from '../../core/controllers/authController';
import { ILoginData } from '../../types/auth';

export class Auth extends Block {
  protected initChildren(): void {
    this.children.inputLogin = new Input({
      name: 'login',
      type: 'text',
      text: 'Логин',
      events: {
        blur: (evt) => {
          validate(Rule.LOGIN, evt.target as HTMLInputElement);
        },
        focus: () => {
          hideError();
        },
      },
    });

    this.children.labelLogin = new Label({
      name: 'login',
      text: 'Логин',
    });

    this.children.inputPassword = new Input({
      name: 'password',
      type: 'password',
      text: 'Пароль',
      events: {
        blur: (evt) => {
          validate(Rule.PASSWORD, evt.target as HTMLInputElement);
        },
        focus: () => {
          hideError();
        },
      },
    });

    this.children.labelPassword = new Label({
      name: 'password',
      text: 'Пароль',
    });

    this.children.buttonEnter = new Button({
      text: 'Вход',
      events: {
        click: (evt) => {
          evt.preventDefault();
          const isError = (document.querySelector('.input-error') as HTMLElement)?.textContent;
          if (isFormValid('.form-wrapper') && !isError) {
            const data: ILoginData = logFormData('.form-wrapper');
            AuthController.login(data);
          } else {
            showError('Все поля должны быть заполнены');
          }
        },
      },
    });

    this.children.linkSingup = new Link({
      text: 'Ещё не зарегистрированы?',
      className: 'link-button',
      events: {
        click: (e) => {
          e.preventDefault();
          const router = new Router('#app');
          router.go('/sign-up');
        },
      },
    });
  }

  render() {
    return this.compile(template, { styles });
  }
}
