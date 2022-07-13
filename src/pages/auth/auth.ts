import template from "./auth.hbs";
import { Button } from "../../components/Button/Button";
import Block from "../../core/Block";

import * as styles from "./auth.css";
import { Input } from '../../components/Input/Input';
import { Link } from '../../components/Link/Link';
import renderDom from '../../core/renderDom';
import { Singup } from '../singup/Singup';
import { Chat } from '../chat/chat';

export class Auth extends Block {
  constructor() {
    super();
  }

  protected initChildren(): void {
    this.children.inputLogin = new Input({
      name: 'login',
      type: 'text',
      text: 'Логин'
    });

    this.children.inputPassword = new Input({
      name: 'password',
      type: 'password',
      text: 'Пароль'
    });

    this.children.buttonEnter = new Button({
      text: "Вход",
      events: {
        click: (e) => {
          e.preventDefault()
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