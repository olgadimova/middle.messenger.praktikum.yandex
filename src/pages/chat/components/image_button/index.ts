import { Component } from 'shared/services';

import tpl from './tpl';

export class ImageButton extends Component {
  render() {
    return this.compile(tpl);
  }
}
