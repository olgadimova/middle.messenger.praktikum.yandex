import { Component } from 'shared/services';

import tpl from './tpl';

export class SidebarSection extends Component {
  render() {
    return this.compile(tpl);
  }
}
