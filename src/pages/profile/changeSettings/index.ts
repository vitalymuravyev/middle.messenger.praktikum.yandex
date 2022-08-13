import { ChangeSettings } from './changeSettings';
import { connect } from '../../../core/connect';

const withUser = connect((state) => ({ ...state.currentUser }));

export default withUser(ChangeSettings);
