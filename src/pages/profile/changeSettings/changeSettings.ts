import Block from '../../../core/Block';
import template from './changeSettings.hbs';
import { Label } from '../../../components/Label';
import { Input } from '../../../components/Input';
import { hideError, isFormValid, Rule, showError, validate } from '../../../utils/validator';
import { Button } from '../../../components/Button';
import { logFormData } from '../../../utils/logFormData';
import UserDataController from '../../../core/controllers/userDataController';
import { Link } from '../../../components/Link';
import { Router } from '../../../core/router/Router';

export class ChangeSettings extends Block {
  constructor(props: any) {
    super(props);
  }

  protected initChildren() {
    this.children.inputEmail = new Input({
      name: 'email',
      type: 'email',
      text: 'Почта',
      value: this.props?.email,
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
      value: this.props?.login,
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
      value: this.props?.first_name,
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
      value: this.props?.second_name,
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

    this.children.inputNickName = new Input({
      name: 'display_name',
      type: 'text',
      text: 'Имя в чате',
      value: this.props?.display_name,
      events: {
        blur: (evt) => {
          validate(Rule.NAME, evt.target as HTMLInputElement);
        },
        focus: () => {
          hideError();
        },
      },
    });

    this.children.labelNickName = new Label({
      name: 'display_name',
      text: 'Имя в чате',
    });

    this.children.inputPhone = new Input({
      name: 'phone',
      type: 'tel',
      text: 'Телефон',
      value: this.props?.phone,
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

    this.children.buttonSave = new Button({
      text: 'Сохранить данные',
      events: {
        click: (evt) => {
          evt.preventDefault();
          const isError = (document.querySelector('.input-error') as HTMLElement)?.textContent;
          if (isFormValid('.form-wrapper') && !isError) {
            const data = logFormData('.form-wrapper');
            UserDataController.changeUser(data as any);
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
    return this.compile(template, {})
  }
}