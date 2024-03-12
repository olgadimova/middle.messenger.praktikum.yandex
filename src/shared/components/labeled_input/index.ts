import Component from 'shared/services/component';
import tpl from './tpl';

export class LabeledInput extends Component {
  render() {
    return this.compile(tpl);
  }
}
