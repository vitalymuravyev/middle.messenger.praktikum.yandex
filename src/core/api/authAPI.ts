import { HTTPTransport } from '../fetch';

interface ILoginData {
  login: string;
  password: string;
}

interface IUserSignup {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export class AuthAPI {
  private fetch: HTTPTransport;

  constructor() {
    this.fetch = new HTTPTransport();
  }

  login(data: ILoginData) {
    return this.fetch.post('/auth/signin', { data });
  }

  signup(data: IUserSignup) {
    return this.fetch.post('/auth/signup', { data })
  }

  logout() {
    return this.fetch.post('/auth/logout', {});
  }

  getUser() {
    return this.fetch.get('/auth/user', {});
  }
}
