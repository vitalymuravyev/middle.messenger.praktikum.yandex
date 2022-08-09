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
}

export default new ChatsController()