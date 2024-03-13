import { Component } from 'shared/services';

import { tpl } from './tpl';

export class Page extends Component {
  render() {
    return this.compile(tpl);
  }
}
