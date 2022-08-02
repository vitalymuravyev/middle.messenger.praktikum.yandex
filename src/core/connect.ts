import { store, StoreEvents } from './store';
import { isEqual } from '../utils/isEqual';

export const connect = (mapStateToProps) => (Component) => {
  let state;
  return class extends Component {
    constructor(props: any) {
      state = mapStateToProps(store.getState());
      super({ ...props, ...state });

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
          state = newState;
        }
      });
    }
  };
};
