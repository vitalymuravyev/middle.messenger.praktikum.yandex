import { Chat } from './chat';
import { connect } from '../../core/connect';

const withChats = connect((state) => ({
  chatsStore: state.allChats,
  chatId: state.chatId,
  token: state.token
}))

export default withChats(Chat);
