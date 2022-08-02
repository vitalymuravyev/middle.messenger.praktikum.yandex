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

interface Props {
  user: User;
}

export class Profile extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    console.log(props)
    super(props);
  }

  protected initChildren({ user }: Props) {
    this.children.userEmail = new UserInfoItem({
      name: 'Почта',
      value: this.props?.email,
    });

    this.children.userLogin = new UserInfoItem({
      name: 'Логин',
      value: this.props?.login,
    });

    this.children.userName = new UserInfoItem({
      name: 'Имя',
      value: this.props?.name,
    });

    this.children.userSurname = new UserInfoItem({
      name: 'Фамилия',
      value: this.props?.second_name,
    });

    this.children.userNickname = new UserInfoItem({
      name: 'Имя в чате',
      value: this.props?.display_name,
    });

    this.children.userPhone = new UserInfoItem({
      name: 'Телефон',
      value: this.props?.phone,
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
