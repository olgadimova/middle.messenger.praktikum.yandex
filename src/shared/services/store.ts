import { EventBus } from 'shared/services';

export type State = {
  user: UserObject | null;
  chats: ChatObject[];
};

export enum StoreEvents {
  Updated = 'updated',
}

type Indexed<T = unknown> = {
  [key in string]: T;
};

class Store extends EventBus {
  private state: State = {
    user: null,
    chats: [],
  };

  public getState() {
    return this.state;
  }

  private _set(state: Indexed, path: string, value: unknown) {
    const params = path.split('.').reduceRight((acc: Indexed, val) => {
      if (!Object.entries(acc).length) {
        acc = { [val]: value };
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
