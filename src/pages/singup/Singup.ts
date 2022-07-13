import Block from '../../core/Block';
import template from './singup.hbs';
import * as styles from './singup.css';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import renderDom from '../../core/renderDom';
import { Link } from '../../components/Link/Link';
import { Auth } from '../auth/auth';

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

    this.children.inputLogin = new Input({
      name: 'login',
      type: 'text',
      text: 'Логин'
    });

    this.children.inputFirstName = new Input({
      name: 'first_name',
      type: 'text',
      text: 'Имя'
    });

    this.children.inputSecondName = new Input({
      name: 'second_name',
      type: 'text',
      text: 'Фамилия'
    });

    this.children.inputPhone = new Input({
      name: 'phone',
      type: 'tel',
      text: 'Телефон'
    });

    this.children.inputPassword = new Input({
      name: 'password',
      type: 'password',
      text: 'Пароль'
    });

    this.children.inputPassword2 = new Input({
      name: 'password2',
      type: 'password',
      text: 'Пароль (ещё раз)'
    });

    this.children.buttonCreateAcc = new Button({
      text: "Создать аккаунт",
      events: {
        click: (e) => {
          e.preventDefault()
          // renderDom('#app', new Singup())
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