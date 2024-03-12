import Component from 'shared/services/component';
import tpl from './tpl';

export class Input extends Component {
  render() {
    return this.compile(tpl);
  }

  addEvents() {
    super.addEvents();

    if (this._props.events && this._props.events.blur) {
      const input = this._element?.querySelector('input');

      input?.addEventListener('blur', this._props.events.blur);
    }
  }

  removeEvents() {
    super.removeEvents();

    if (this._props.events && this._props.events.blur) {
      const input = this._element?.querySelector('input');

      input?.removeEventListener('blur', this._props.events.blur);
    }
  }
}
