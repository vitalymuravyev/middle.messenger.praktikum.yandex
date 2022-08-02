import { AuthAPI } from '../api/authAPI';
import { Router } from '../router/Router';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  login(data) {
    this.api.login(data)
      .then(() => {
        const router = new Router('#app');
        router.go('/messenger');
      })

  }

  signup(data) {
    this.api.signup(data)
      .then(() => {
        const router = new Router('#app');
        router.go('/messenger');
      })
      .catch((err) => {
        throw new Error(err);
      })
  }

  logout() {
    this.api.logout()
      .then(() => {
        const router = new Router('#app');
        router.go('/');
      })
  }
}

export default new AuthController();
