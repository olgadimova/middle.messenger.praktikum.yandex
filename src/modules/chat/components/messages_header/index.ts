import Component from 'shared/services/component';
import tpl from './tpl';

export class MessagesHeader extends Component {
  render() {
    return this.compile(tpl);
  }
}
