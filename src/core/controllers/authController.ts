import { AuthAPI } from '../api/authAPI';
import { Router } from '../router/Router';
import { ILoginData, IUserSignup } from '../../types/auth';
import { store } from '../store';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  login(data: ILoginData) {
    this.api.login(data)
      .then(() => {
        this.getUser();
      })
      .then(() => {
        const router = new Router('#app');
        router.go('/messenger');
      });
  }

  signup(data: IUserSignup) {
    this.api.signup(data)
      .then(() => {
        this.getUser();
      })
      .then(() => {
        const router = new Router('#app');
        router.go('/messenger');
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  logout() {
    this.api.logout()
      .then(() => {
        const router = new Router('#app');
        router.go('/');
      });
  }

  getUser() {
    this.api.getUser()
      .then((resp) => {
        console.log('getU', resp);
        store.set('currentUser', resp);
      });
  }
}

export default new AuthController();
