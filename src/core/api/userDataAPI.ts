import { HTTPTransport } from '../fetch';
import { IChangePassword, IUserData } from '../../types/userData';

export class UserDataAPI {
  private fetch: HTTPTransport;

  constructor() {
    this.fetch = new HTTPTransport();
  }

  changeProfile(data: IUserData) {
    return this.fetch.put('/user/profile', { data });
  }

  changeAvatar(data: any) {
    return this.fetch.put('/user/profile/avatar', { data, headers: { 'Content-Type': 'multipart/form-data' } });
  }

  changePassword(data: IChangePassword) {
    return this.fetch.put('/user/password', { data });
  }
}
