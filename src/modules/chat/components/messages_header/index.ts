import { Component } from 'shared/services';

import tpl from './tpl';

export class MessagesHeader extends Component {
  render() {
    return this.compile(tpl);
  }
}
