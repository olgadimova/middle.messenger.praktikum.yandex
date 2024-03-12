import Component from 'shared/services/component';
import tpl from './tpl';

export class ChatsHeader extends Component {
  render() {
    return this.compile(tpl);
  }
}
