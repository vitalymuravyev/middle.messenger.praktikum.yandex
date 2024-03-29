import Block from '../../core/Block';
import * as template from './singup.hbs';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { logFormData } from '../../utils/logFormData';
import { Label } from '../../components/Label';
import {
  hideError, isFormValid, Rule, showError, validate,
} from '../../utils/validator';
import { Router } from '../../core/router/Router';
import AuthController from '../../core/controllers/authController';
import { IUserSignup } from '../../types/auth';

export class Singup extends Block<any> {
  protected initChildren() {
    this.children.inputEmail = new Input({
      name: 'email',
      type: 'email',
      text: 'Почта',
      events: {
        blur: (evt) => {
          validate(Rule.EMAIL, evt.target as HTMLInputElement);
        },
        focus: () => {
          hideError();
        },
      },
    });

    this.children.labelEmail = new Label({
      name: 'email',
      text: 'Почта',
    });

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

    this.children.inputFirstName = new Input({
      name: 'first_name',
      type: 'text',
      text: 'Имя',
      events: {
        blur: (evt) => {
          validate(Rule.NAME, evt.target as HTMLInputElement);
        },
        focus: () => {
          hideError();
        },
      },
    });

    this.children.labelFirstName = new Label({
      name: 'first_name',
      text: 'Имя',
    });

    this.children.inputSecondName = new Input({
      name: 'second_name',
      type: 'text',
      text: 'Фамилия',
      events: {
        blur: (evt) => {
          validate(Rule.NAME, evt.target as HTMLInputElement);
        },
        focus: () => {
          hideError();
        },
      },
    });

    this.children.labelSecondName = new Label({
      name: 'second_name',
      text: 'Фамилия',
    });

    this.children.inputPhone = new Input({
      name: 'phone',
      type: 'tel',
      text: 'Телефон',
      events: {
        blur: (evt) => {
          validate(Rule.PHONE, evt.target as HTMLInputElement);
        },
        focus: () => {
          hideError();
        },
      },
    });

    this.children.labelPhone = new Label({
      name: 'phone',
      text: 'Телефон',
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

    this.children.inputPassword2 = new Input({
      name: 'password2',
      type: 'password',
      text: 'Пароль (ещё раз)',
      events: {
        blur: (evt) => {
          const passInput = document.querySelector('input[name=password]') as HTMLInputElement;

          if (passInput && passInput.value !== (evt.target as HTMLInputElement).value) {
            showError('Пароли должны совпадать');
          }
        },
        focus: () => {
          hideError();
        },
      },
    });

    this.children.labelPassword2 = new Label({
      name: 'password2',
      text: 'Пароль (ещё раз)',
    });

    this.children.buttonCreateAcc = new Button({
      text: 'Создать аккаунт',
      events: {
        click: (evt) => {
          evt.preventDefault();
          const isError = (document.querySelector('.input-error') as HTMLElement)?.textContent;
          if (isFormValid('.form-wrapper') && !isError) {
            const data = logFormData('.form-wrapper');
            AuthController.signup(data as unknown as IUserSignup);
          } else {
            showError('Все поля должны быть заполнены');
          }
        },
      },
    });

    this.children.linkSingin = new Link({
      text: 'Войти',
      className: 'link-button',
      events: {
        click: (e) => {
          e.preventDefault();
          const router = new Router('#app');
          router.go('/');
        },
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
