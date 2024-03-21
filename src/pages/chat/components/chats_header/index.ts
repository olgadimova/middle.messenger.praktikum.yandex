import { Component } from 'shared/services';

import tpl from './tpl';

export class ChatsHeader extends Component {
  render() {
    return this.compile(tpl);
  }
}
