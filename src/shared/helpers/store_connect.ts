import { Component, type ComponentProps, store, StoreEvents, type State } from 'shared/services';
import { isEqual } from 'shared/helpers';

export const connect = (mapStateToProps: (state: State) => State) => (ExtendedComponent: typeof Component) =>
  class extends ExtendedComponent {
    constructor(tag: string, props: ComponentProps) {
      let state = mapStateToProps(store.getState());

      super(tag, { ...props, ...state });

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }

        state = newState;
      });
    }
  };