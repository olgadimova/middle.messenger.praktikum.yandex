import { Component } from 'shared/services';

import tpl from './tpl';

export class BackButton extends Component {
  render() {
    return this.compile(tpl);
  }
}
