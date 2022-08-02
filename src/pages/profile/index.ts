import { Profile } from './profile';
import { connect } from '../../core/connect';

const withUser = connect((state) => ({ ...state.currentUser }));

export default withUser(Profile);
