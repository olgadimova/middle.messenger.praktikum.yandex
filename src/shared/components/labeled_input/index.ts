import { Component } from 'shared/services';

import tpl from './tpl';

export class LabeledInput extends Component {
  render() {
    return this.compile(tpl);
  }
}
