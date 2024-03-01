import Component from 'shared/services/component';
import tpl from './tpl';

export class Messages extends Component {
  render() {
    return this.compile(tpl);
  }
}
