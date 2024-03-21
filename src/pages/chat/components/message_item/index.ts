import { Component } from 'shared/services';

import tpl from './tpl';

export class MessageItem extends Component {
  render() {
    return this.compile(tpl);
  }
}
