import Block from '../../core/Block';
import template from './profile.hbs';
import * as styles from './profile.css';
import { Link } from '../../components/Link';
import { UserInfoItem } from '../../components/UserInfoItem';
import AuthController from '../../core/controllers/authController';
import { logFormData } from '../../utils/logFormData';
import UserDataController from '../../core/controllers/userDataController';
import { Avatar } from '../../components/Avatar';

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
    this.children.avatar = new Avatar({
      events: {
        click: (evt) => {
          // evt.preventDefault();
          const inputFile: any = document.querySelector('.profile-avatar');
          const formData: any = new FormData();
          formData.append("avatar", inputFile.files[0]);
          console.log(inputFile.files[0])
          UserDataController.changeAvatar(formData)
        }
      }
    })

    this.children.userEmail = new UserInfoItem({
      title: 'Почта',
      value: props?.email,
      name: 'email'
    });

    this.children.userLogin = new UserInfoItem({
      title: 'Логин',
      value: props?.login,
      name: 'login'
    });

    this.children.userName = new UserInfoItem({
      title: 'Имя',
      value: props?.first_name,
      name: 'first_name'
    });

    this.children.userSurname = new UserInfoItem({
      title: 'Фамилия',
      value: props?.second_name,
      name: 'second_name'
    });

    this.children.userNickname = new UserInfoItem({
      title: 'Имя в чате',
      value: props?.display_name,
      name: 'display_name'
    });

    this.children.userPhone = new UserInfoItem({
      title: 'Телефон',
      value: props?.phone,
      name: 'phone'
    });

    this.children.linkChangeData = new Link({
      text: 'Изменить данные',
      className: 'profile-actions_item',
      events: {
        click: (e) => {
          e.preventDefault();
          const data = logFormData('.profile-data_list');
          UserDataController.changeUser(data);
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
