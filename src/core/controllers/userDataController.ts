import { UserDataAPI } from '../api/userDataAPI';
import { IUserData } from '../../types/userData';

class UserDataController {
  private api: UserDataAPI;

  constructor() {
    this.api = new UserDataAPI();
  }

  changeUser(data: IUserData) {
    this.api.changeProfile(data)
      .then((resp) => {
        console.log('resp after change ', resp)
      })
  }

  changeAvatar(data) {
    this.api.changeAvatar(data);
  }
}

export default new UserDataController();
