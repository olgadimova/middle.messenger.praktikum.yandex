import { Component } from 'shared/services';

import tpl from './tpl';

export class ErrorPageLayout extends Component {
  render() {
    return this.compile(tpl);
  }
}
