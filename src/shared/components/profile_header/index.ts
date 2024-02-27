import Component from 'shared/services/component';
import tpl from './tpl';

import './styles.scss';

export class ProfileHeader extends Component {
  render() {
    return this.compile(tpl);
  }
}
