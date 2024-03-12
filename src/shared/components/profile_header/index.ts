import Component from 'shared/services/component';
import tpl from './tpl';

export class ProfileHeader extends Component {
  render() {
    return this.compile(tpl);
  }
}
