import { Component } from 'shared/services';

import tpl from './tpl';

export class ChatLayout extends Component {
  render() {
    return this.compile(tpl);
  }
}
