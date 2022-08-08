import { HTTPTransport } from '../fetch';
import { IUserData } from '../../types/userData';

export class UserDataAPI {
  private fetch: HTTPTransport;

  constructor() {
    this.fetch = new HTTPTransport();
  }

  changeProfile(data: IUserData) {
    return this.fetch.put('/user/profile', { data })
  }

  changeAvatar(data) {
    return this.fetch.put('/user/profile/avatar', { data })
  }
}