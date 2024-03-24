import { Component, ComponentProps } from 'shared/services';
import { MessageItem } from 'pages/chat/components';
import { connect, isEqual } from 'shared/helpers';

import tpl from './tpl';

export class MessagesSection extends Component {
  render() {
    return this.compile(tpl);
  }

  public componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps) {
    if (oldProps.selectedChatId !== newProps.selectedChatId) {
      return true;
    }

    if (oldProps.state && newProps.state && !isEqual(oldProps.state, newProps.state)) {
      this.setProps({
        messages: newProps.state.messages
          .sort((a: Message, b: Message) => (a.time < b.time ? -1 : 1))
          .map((message: Message) => {
            if (message.type !== 'user connected') {
              return new MessageItem('div', {
                attr: {
                  class: message.user_id === this.props.state?.user?.id ? 'myMessage' : 'otherMessage',
                },
                content: message.content,
                createdAt: new Date(message.time).toLocaleDateString(),
              });
            }

            return '';
          }),
      });

      return true;
    }

    return false;
  }
}

const withStore = connect((state) => ({ user: state.user, chats: state.chats, messages: state.messages }));

export const ConnectedMessagesSection = withStore(MessagesSection);
