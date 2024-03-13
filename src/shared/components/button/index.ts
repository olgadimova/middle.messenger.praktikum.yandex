import { Component } from 'shared/services';

import tpl from './tpl';

export class Button extends Component {
  render() {
    return this.compile(tpl);
  }
}
