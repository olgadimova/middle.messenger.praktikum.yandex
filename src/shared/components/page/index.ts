import Component from '../../services/component';
import { tpl } from './tpl';

export class Page extends Component {
  render() {
    return this.compile(tpl);
  }
}
