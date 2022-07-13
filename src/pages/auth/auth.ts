import template from "./auth.hbs";
import { Button } from "../../components/Button/Button";
import Block from "../../core/Block";

import * as styles from "./auth.css";
import { Input } from '../../components/Input/Input';
import { Link } from '../../components/Link/Link';

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

    this.children.enterbutton = new Button({
      text: "Вход",
      events: {
        click: () => {
          console.log('dsfsa')
        },
      },
    });

    this.children.singupLink = new Link({
      url: '../singup/singup.html',
      text: 'Ещё не зарегистрированы?',
      className: 'link-button',
    })
  }

  render() {
    return this.compile(template, { styles });
  }
}