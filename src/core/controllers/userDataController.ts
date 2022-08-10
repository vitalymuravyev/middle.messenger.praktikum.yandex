import { UserDataAPI } from '../api/userDataAPI';
import { IUserData } from '../../types/userData';
import { Router } from '../router/Router';
import AuthController from './authController';
import store from '../store';

class UserDataController {
  private api: UserDataAPI;

  constructor() {
    this.api = new UserDataAPI();
  }

  changeUser(data: IUserData) {
    this.api.changeProfile(data)
      .then(() => AuthController.getUser())
      .then(() => {
        const router = new Router('#app');
        router.go('/settings');
      })
  }

  changeAvatar(data) {
    this.api.changeAvatar(data)
      .then((resp) => JSON.parse(resp.response))
      .then((data) => store.set('currentUser', data))
      .then(() => {
        const router = new Router('#app');
        router.go('/settings');
      });
  }

  changePassword(data) {
    this.api.changePassword(data)
      .then(() => {
        const router = new Router('#app');
        router.go('/messenger');
      });
  }

}

export default new UserDataController();
