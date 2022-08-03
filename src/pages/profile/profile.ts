import Block from '../../core/Block';
import template from './profile.hbs';
import * as styles from './profile.css';
import { Link } from '../../components/Link';
import { UserInfoItem } from '../../components/UserInfoItem';
import AuthController from '../../core/controllers/authController';

export interface User {
  email: string;
  login: string;
  name: string;
  second_name: string;
  display_name: string;
  phone: string;
}

export class Profile extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: any) {
    super(props);
  }

  protected initChildren(props: any) {
    console.log(props)
    this.children.userEmail = new UserInfoItem({
      name: 'Почта',
      value: props?.email,
    });

    this.children.userLogin = new UserInfoItem({
      name: 'Логин',
      value: props?.login,
    });

    this.children.userName = new UserInfoItem({
      name: 'Имя',
      value: props?.name,
    });

    this.children.userSurname = new UserInfoItem({
      name: 'Фамилия',
      value: props?.second_name,
    });

    this.children.userNickname = new UserInfoItem({
      name: 'Имя в чате',
      value: props?.display_name,
    });

    this.children.userPhone = new UserInfoItem({
      name: 'Телефон',
      value: props?.phone,
    });

    this.children.linkChangeData = new Link({
      text: 'Изменить данные',
      className: 'profile-actions_item',
      events: {
        click: (e) => {
          e.preventDefault();
          // renderDom('#app', new Auth())
        },
      },
    });

    this.children.linkChangePassword = new Link({
      text: 'Изменить пароль',
      className: 'profile-actions_item',
      events: {
        click: (e) => {
          e.preventDefault();
          // renderDom('#app', new Auth())
        },
      },
    });

    this.children.linkExit = new Link({
      text: 'Выйти',
      className: 'profile-actions_item',
      events: {
        click: (e) => {
          e.preventDefault();
          AuthController.logout();
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
