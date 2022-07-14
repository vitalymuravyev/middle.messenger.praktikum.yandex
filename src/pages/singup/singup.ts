import Block from '../../core/Block';
import template from './singup.hbs';
import * as styles from './singup.css';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import renderDom from '../../core/renderDom';
import { Link } from '../../components/Link';
import { Auth } from '../auth';
import { Profile } from '../profile';
import { mockUser } from '../../mock/user';
import { logFormData } from '../../utils/logFormData';
import { Label } from '../../components/Label';

export class Singup extends Block {
  constructor() {
    super();
  }

  protected initChildren() {
    this.children.inputEmail = new Input({
      name: 'email',
      type: 'email',
      text: 'Почта'
    });

    this.children.labelEmail = new Label({
      name: 'email',
      text: 'Почта',
    });

    this.children.inputLogin = new Input({
      name: 'login',
      type: 'text',
      text: 'Логин'
    });

    this.children.labelLogin = new Label({
      name: 'login',
      text: 'Логин'
    });

    this.children.inputFirstName = new Input({
      name: 'first_name',
      type: 'text',
      text: 'Имя'
    });

    this.children.labelFirstName = new Label({
      name: 'first_name',
      text: 'Имя'
    });

    this.children.inputSecondName = new Input({
      name: 'second_name',
      type: 'text',
      text: 'Фамилия'
    });

    this.children.labelSecondName = new Label({
      name: 'second_name',
      text: 'Фамилия'
    });

    this.children.inputPhone = new Input({
      name: 'phone',
      type: 'tel',
      text: 'Телефон'
    });

    this.children.labelPhone = new Label({
      name: 'phone',
      text: 'Телефон'
    });

    this.children.inputPassword = new Input({
      name: 'password',
      type: 'password',
      text: 'Пароль'
    });

    this.children.labelPassword = new Label({
      name: 'password',
      text: 'Пароль'
    });

    this.children.inputPassword2 = new Input({
      name: 'password2',
      type: 'password',
      text: 'Пароль (ещё раз)'
    });

    this.children.labelPassword2 = new Label({
      name: 'password2',
      text: 'Пароль (ещё раз)'
    });

    this.children.buttonCreateAcc = new Button({
      text: "Создать аккаунт",
      events: {
        click: (e) => {
          e.preventDefault();
          logFormData('.form-wrapper');
          renderDom('#app', new Profile({ user: mockUser }))
        },
      },
    });

    this.children.linkSingin = new Link({
      text: 'Войти',
      className: 'link-button',
      events: {
        click: e => {
          e.preventDefault();
          renderDom('#app', new Auth())
        }
      }
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, { styles })
  }
}