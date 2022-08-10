import Block from '../../core/Block';
import template from './profile.hbs';
import * as styles from './profile.css';
import { Link } from '../../components/Link';
import { UserInfoItem } from '../../components/UserInfoItem';
import AuthController from '../../core/controllers/authController';
import { Avatar } from '../../components/Avatar';
import { Router } from '../../core/router/Router';

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

  protected initChildren() {
    this.children.avatar = new Avatar({
      link: `https://ya-praktikum.tech/api/v2/resources${this.props?.avatar}`,
      events: {
        click: (evt) => {
          evt.preventDefault();
          const router = new Router('#app');
          router.go('/settings/change-avatar');
        },
      },
    });

    this.children.userEmail = new UserInfoItem({
      title: 'Почта',
      value: this.props?.email,
    });

    this.children.userLogin = new UserInfoItem({
      title: 'Логин',
      value: this.props?.login,
    });

    this.children.userName = new UserInfoItem({
      title: 'Имя',
      value: this.props?.first_name,
    });

    this.children.userSurname = new UserInfoItem({
      title: 'Фамилия',
      value: this.props?.second_name,
    });

    this.children.userNickname = new UserInfoItem({
      title: 'Имя в чате',
      value: this.props?.display_name,
    });

    this.children.userPhone = new UserInfoItem({
      title: 'Телефон',
      value: this.props?.phone,
    });

    this.children.linkChangeData = new Link({
      text: 'Изменить данные',
      className: 'profile-actions_item',
      events: {
        click: (e) => {
          e.preventDefault();
          const router = new Router('#app');
          router.go('/settings/change-settings');
        },
      },
    });

    this.children.linkChangePassword = new Link({
      text: 'Изменить пароль',
      className: 'profile-actions_item',
      events: {
        click: (e) => {
          e.preventDefault();
          const router = new Router('#app');
          router.go('/settings/change-password');
        },
      },
    });

    this.children.linkBack = new Link({
      text: 'К чатам',
      className: 'profile-actions_item',
      events: {
        click: (e) => {
          e.preventDefault();
          const router = new Router('#app');
          router.go('/messenger');
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
