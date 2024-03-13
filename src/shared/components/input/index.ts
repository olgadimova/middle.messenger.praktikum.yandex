import { Component } from 'shared/services';

import tpl from './tpl';

export class Input extends Component {
  render() {
    return this.compile(tpl);
  }

  addEvents() {
    super.addEvents();

    if (this.props.events && this.props.events.blur) {
      const input = this.element?.querySelector('input');

      input?.addEventListener('blur', this.props.events.blur);
    }
  }

  removeEvents() {
    super.removeEvents();

    if (this.props.events && this.props.events.blur) {
      const input = this.element?.querySelector('input');

      input?.removeEventListener('blur', this.props.events.blur);
    }
  }
}
