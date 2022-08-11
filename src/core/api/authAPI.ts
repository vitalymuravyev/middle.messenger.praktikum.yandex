import { HTTPTransport } from '../fetch';
import { ILoginData, IUserSignup } from '../../types/auth';

export class AuthAPI {
  private fetch: HTTPTransport;

  constructor() {
    this.fetch = new HTTPTransport();
  }

  login(data: ILoginData) {
    return this.fetch.post('/auth/signin', { data })
      .then((resp) => {
        console.log(resp);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  signup(data: IUserSignup) {
    return this.fetch.post('/auth/signup', { data });
  }

  logout() {
    return this.fetch.post('/auth/logout', {});
  }

  getUser() {
    return this.fetch.get('/auth/user', {});
  }
}
