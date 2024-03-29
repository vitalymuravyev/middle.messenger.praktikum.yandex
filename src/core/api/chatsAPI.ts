import { HTTPTransport } from '../fetch';

export interface ICreateChat {
  title: string;
}

export interface IUsersAtChat {
  users: number[]
  chatId: number
}

export class ChatsAPI {
  private fetch: HTTPTransport;

  constructor() {
    this.fetch = new HTTPTransport();
  }

  getAllChats() {
    return this.fetch.get('/chats', {});
  }

  createChat(data: ICreateChat) {
    return this.fetch.post('/chats', { data });
  }

  getChat(id: number) {
    return this.fetch.post(`/chats/token/${id}`, {});
  }

  deleteChat(id: number) {
    return this.fetch.delete('/chats', { data: { chatId: id } });
  }

  addUserToChat(data: IUsersAtChat) {
    return this.fetch.put('/chats/users', { data });
  }

  deleteUserFromChat(data: IUsersAtChat) {
    return this.fetch.delete('/chats/users', { data });
  }
}
