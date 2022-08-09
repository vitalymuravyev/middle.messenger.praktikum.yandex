import { Chat } from './chat';
import { connect } from '../../core/connect';

const withChats = connect((state) => ({
  chatsStore: state.allChats,
  chatId: state.chatId,
  token: state.token,
  currentUser: state.currentUser
}))

export default withChats(Chat);
