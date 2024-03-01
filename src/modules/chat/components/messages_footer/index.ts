import Component from 'shared/services/component';
import tpl from './tpl';

export class MessagesFooter extends Component {
  render() {
    return this.compile(tpl);
  }
}
