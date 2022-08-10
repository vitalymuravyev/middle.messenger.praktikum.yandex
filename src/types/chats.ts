export interface IChatInfo {
  last_message: {
    content: string
  };
  title: string;
  id: number;
  unread_count: number;
}

export interface IMessageData {
  time: Date;
  user_id: number;
  content: string;
}
