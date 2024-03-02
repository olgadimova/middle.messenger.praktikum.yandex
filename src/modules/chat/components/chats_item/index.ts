import Component from 'shared/services/component';
import tpl from './tpl';

export class ChatsItem extends Component {
  render() {
    return this.compile(tpl);
  }
}
