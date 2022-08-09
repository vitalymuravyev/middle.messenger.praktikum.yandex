import { ChatsAPI, ICreateChat } from "../api/chatsAPI";
import store from '../store';

class ChatsController {
  private api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
  }

  createChat(data: ICreateChat) {
    this.api.createChat(data)
      .then(() => this.getChats())
  }

  getChats() {
    this.api.getAllChats()
      .then((resp) => {
        store.set('allChats', JSON.parse(resp.response))
      })
  }

  async getChat(id: number) {
    const token = await this.api.getChat(id);
    store.set('chatId', id);
    store.set('token', token);
  }

  deleteChat(id: number) {
    this.api.deleteChat(id)
      .then(() => this.getChats());
  }

  addUser(data) {
    this.api.addUserToChat(data);
  }

  deleteUser(data) {
    this.api.deleteUserFromChat(data);
  }
}

export default new ChatsController()