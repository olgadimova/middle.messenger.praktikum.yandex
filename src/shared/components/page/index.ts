import { Component } from 'shared/services';

import { tpl } from './tpl';

export class Page extends Component {
  render() {
    return this.compile(tpl);
  }

  show() {
    if (this.element) {
      this.element.style.display = 'flex';
    }
  }
}
