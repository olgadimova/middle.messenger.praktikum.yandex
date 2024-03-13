import { Component } from 'shared/services';

import tpl from './tpl';

export class MessagesSection extends Component {
  render() {
    return this.compile(tpl);
  }
}
