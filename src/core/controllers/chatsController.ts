import { ChatsAPI, ICreateChat } from "../api/chatsAPI";
import store from '../store';

class ChatsController {
  private api: ChatsAPI;
  socket: WebSocket | null;
  data: any;

  constructor() {
    this.api = new ChatsAPI();
    this.socket = null;
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

  async getChat(id: number, userId: number) {
    const resp = await this.api.getChat(id);
    const { token } = JSON.parse(resp.response)
    store.set('chatId', id);
    store.set('token', token);

    if (this.socket) {
      this.socket.close();
    }

    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`)

    this.socket.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('open', () => {
      console.log('connection open');
      this.socket.send(JSON.stringify({
        content: '0',
        type: 'get old'
      }))

      this.socket.addEventListener('message', (evt) => {
        this.data = {
          ...JSON.parse(evt.data),
          chatId: id,
        }
      })
    })

    this.socket.addEventListener("error", (event) => {
      console.log("Ошибка", event.message);
    });

    this.getChats();
  }

  async sendMessage(newMessage) {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          content: newMessage.message,
          type: "message",
        })
      );
      this.socket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        })
      );
    }
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