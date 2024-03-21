import { Component } from 'shared/services';
import { connect } from 'shared/helpers';
import { tpl } from './tpl';

export class Page extends Component {
  render() {
    return this.compile(tpl);
  }

  show() {
    if (this.element) {
      this.element.style.display = 'flex';
    }
  }
}

const withStore = connect((state) => ({ user: state.user, chats: state.chats, messages: state.messages }));

export const ConnectedPage = withStore(Page);
