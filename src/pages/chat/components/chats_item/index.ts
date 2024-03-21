import { Component } from 'shared/services';

import tpl from './tpl';

export class ChatsItem extends Component {
  render() {
    return this.compile(tpl);
  }
}
