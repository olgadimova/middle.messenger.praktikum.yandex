import { Component } from 'shared/services';

import tpl from './tpl';

export class LabeledField extends Component {
  render() {
    return this.compile(tpl);
  }
}
