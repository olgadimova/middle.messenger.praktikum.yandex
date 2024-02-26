import Component from '../../services/component';
import { tpl } from './tpl';

export default class Page extends Component {
  render() {
    return this.compile(tpl);
  }
}
