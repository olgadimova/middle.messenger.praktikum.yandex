import { Component } from 'shared/services';
import tpl from './tpl';

export class MessagesFooter extends Component {
  render() {
    return this.compile(tpl);
  }
}
