import store, { StoreEvents } from './store';
import { isEqual } from '../utils/isEqual';
import Block from './Block';

export const connect = (mapStateToProps: (state: any) => Record<string, unknown>) => (Component: typeof Block) => {
  return class extends Component {
    constructor(props: any) {
      let state: Record<string, unknown> = mapStateToProps(store.getState());
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
