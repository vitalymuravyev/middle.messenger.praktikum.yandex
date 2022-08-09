import EventBus from './EventBus';
import { set } from '../utils/set';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: any = {};

  getState() {
    return this.state;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
