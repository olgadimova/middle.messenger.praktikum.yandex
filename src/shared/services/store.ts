import { isArray, isPlainObject } from '../helpers';
import { EventBus } from './event_bus';

export type State = {
  user: UserObject | null;
  chats: ChatObject[];
  messages: Message[];
};

export enum StoreEvents {
  Updated = 'updated',
}

type Indexed<T = unknown> = {
  [key in string]: T;
};

type ArrayOfObjects = Array<Record<string, string | number>>;

class Store extends EventBus {
  private state: State = {
    user: null,
    chats: [],
    messages: [],
  };

  public getState() {
    return this.state;
  }

  private _set(state: Indexed, path: string, value: unknown) {
    const params = path.split('.').reduceRight((acc: Indexed, val: string) => {
      if (!Object.entries(acc).length && !isArray(state[val])) {
        acc = { [val]: value };
        return acc;
      }

      if (isArray(state[val]) && isArray(value)) {
        acc = { [val]: value };
        return acc;
      }

      if (isArray(state[val]) && !(state[val] as []).length) {
        acc = { [val]: [value] };
        return acc;
      }

      if (isPlainObject(value) && isArray(state[val]) && (state[val] as []).length) {
        const exists = (state[val] as ArrayOfObjects).some((item) => item.id === value.id);
        if (exists) return acc;

        acc = { [val]: [...(state[val] as ArrayOfObjects), value] };
        return acc;
      }

      acc = { [val]: { ...acc } };
      return acc;
    }, {});

    return Object.assign(state, params);
  }

  public set(path: string, value: unknown) {
    this._set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store();
