import { Chat } from './chat';
import { connect } from '../../core/connect';

const withChats = connect((state) => ({
  chatsStore: state.allChats
}))

export default withChats(Chat);
