import Block from '../../core/Block';
import template from './profile.hbs';
import * as styles from './profile.css';
import { Link } from '../../components/Link';
import renderDom from '../../core/renderDom';
import { Auth } from '../auth';
import { UserInfoItem } from '../../components/UserInfoItem';

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
  constructor(props: Props) {
    super(props);
  }

  protected initChildren({ user }: Props) {
    this.children.userEmail = new UserInfoItem({
      name: 'Почта',
      value: user.email,
    });

    this.children.userLogin = new UserInfoItem({
      name: 'Логин',
      value: user.login,
    });

    this.children.userName = new UserInfoItem({
      name: 'Имя',
      value: user.name,
    });

    this.children.userSurname = new UserInfoItem({
      name: 'Фамилия',
      value: user.second_name,
    });

    this.children.userNickname = new UserInfoItem({
      name: 'Имя в чате',
      value: user.display_name,
    });

    this.children.userPhone = new UserInfoItem({
      name: 'Телефон',
      value: user.phone,
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
          renderDom('#app', new Auth());
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
