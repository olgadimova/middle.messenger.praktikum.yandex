import { Component } from 'shared/services';

import tpl from './tpl';

export class ProfileHeader extends Component {
  render() {
    return this.compile(tpl);
  }
}
