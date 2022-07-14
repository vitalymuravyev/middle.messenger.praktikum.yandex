import template from "./auth.hbs";
import { Button } from "../../components/Button";
import Block from "../../core/Block";

import * as styles from "./auth.css";
import { Input } from '../../components/Input';
import { Link } from '../../components/Link';
import renderDom from '../../core/renderDom';
import { Singup } from '../singup';
import { Chat } from '../chat';
import { logFormData } from '../../utils/logFormData';
import { Label } from '../../components/Label';

export class Auth extends Block {
  constructor() {
    super();
  }

  protected initChildren(): void {
    this.children.inputLogin = new Input({
      name: 'login',
      type: 'text',
      text: 'Логин',
    });

    this.children.labelLogin = new Label({
      name: 'login',
      text: 'Логин',
    });

    this.children.inputPassword = new Input({
      name: 'password',
      type: 'password',
      text: 'Пароль',
    });

    this.children.labelPassword = new Label({
      name: 'password',
      text: 'Пароль',
    });

    this.children.buttonEnter = new Button({
      text: "Вход",
      events: {
        click: (e) => {
          e.preventDefault()
          logFormData('.form-wrapper')
          renderDom('#app', new Chat())
        },
      },
    });

    this.children.linkSingup = new Link({
      text: 'Ещё не зарегистрированы?',
      className: 'link-button',
      events: {
        click: (e) => {
          e.preventDefault()
          renderDom('#app', new Singup())
        },
      },
    })
  }

  render() {
    return this.compile(template, { styles });
  }
}