import Component from 'shared/services/component';
import tpl from './tpl';

import './styles.scss';

export class BackButton extends Component {
  render() {
    return this.compile(tpl);
  }
}
