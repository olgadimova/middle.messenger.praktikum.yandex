import { Input, Page, Button, Link } from 'shared/components';
import { handleValidateInput, chats } from 'shared/helpers';
import {
  ChatsHeader,
  Form,
  ChatsItem,
  SidebarSection,
  MessagesHeader,
  MessagesFooter,
  MessagesSection,
  ChatLayout,
  MessageItem,
  Modal,
  ImageButton,
} from './components';

import './components/index.scss';

const toggleManageChatModal = () => {
  const manageChatModal = document.getElementById('manageChatModal');

  if (manageChatModal) {
    let modalStyle = manageChatModal.style;
    if (modalStyle.display === 'none') {
      modalStyle.display = 'flex';
    } else {
      modalStyle.display = 'none';
    }
  }
};

const chatsHeader = new ChatsHeader('div', {
  linkToProfile: new Link('a', {
    label: 'Профиль',
    attr: {
      href: '/profile',
      class: 'link',
    },
  }),
  form: new Form('form', {
    attr: {
      class: 'formSearchChat',
      id: 'searchForm',
    },
    formId: 'searchForm',
    fields: [
      new Input('div', {
        type: 'text',
        name: 'search',
        placeholder: 'Найти Чат',
        class: 'searchInput',
        formId: 'searchForm',
      }),
    ],
  }),
});

const manageChatModalSubmitButton = new Button('button', {
  attr: {
    type: 'submit',
    class: 'primaryButton',
  },
  label: 'Добавить',
});

const manageChatModalInput = new Input('div', {
  attr: {
    class: 'formField',
  },
  id: 'modalInput',
  formId: 'addChatUser',
  type: 'text',
  name: 'login',
  placeholder: 'Введите имя пользователя',
  label: 'Логин',
  class: 'searchInput',
});

const manageChatModalForm = new Form('form', {
  attr: {
    class: 'modalForm',
    id: 'addChatUser',
  },
  formId: 'addChatUser',
  fields: [manageChatModalInput, manageChatModalSubmitButton],
});

const manageChatModal = new Modal('div', {
  attr: {
    class: 'modal',
    role: 'dialog',
    style: 'display: none',
  },
  title: 'Добавить Пользователя',
  form: manageChatModalForm,
});

const messagesHeader = new MessagesHeader('nav', {
  attr: {
    class: 'chatHeader',
  },
  manageChatButton: new ImageButton('button', {
    attr: {
      class: 'imageButton',
    },
    image: '<img src="/assets/more.svg" width="25px" height="25px" alt="user avatar" />',
    events: {
      click: toggleManageChatModal,
    },
  }),
  actions: [
    new Button('button', {
      attr: {
        type: 'button',
        value: 'addChatUser',
        class: 'primaryButton chatControls',
      },
      label: 'Добавить Пользователя',
      events: {
        click: () => {
          toggleManageChatModal();

          manageChatModalInput.setProps({
            formId: 'addChatUser',
          });

          manageChatModalSubmitButton.setProps({
            label: 'Добавить',
          });

          manageChatModalForm.setProps({
            attr: {
              id: 'addChatUser',
            },
            formId: 'addChatUser',
          });

          manageChatModal.setProps({
            attr: {
              style: 'display: flex',
            },
            title: 'Добавить Пользователя',
            modalId: 'delteChatUser',
          });
        },
      },
    }),
    new Button('button', {
      attr: {
        class: 'primaryButton chatControls',
        type: 'button',
        value: 'deleteChatUser',
      },
      label: 'Удалить Пользователя',
      events: {
        click: () => {
          toggleManageChatModal();

          manageChatModalInput.setProps({
            formId: 'deleteChatUser',
          });

          manageChatModalSubmitButton.setProps({
            label: 'Удалить',
          });

          manageChatModalForm.setProps({
            attr: {
              id: 'deleteChatUser',
            },
            formId: 'deleteChatUser',
          });

          manageChatModal.setProps({
            attr: {
              style: 'display: flex',
            },
            title: 'Удалить Пользователя',
          });
        },
      },
    }),
  ],
});

const messagesFooter = new MessagesFooter('div', {
  attr: {
    class: 'chatFooter',
  },
  children: new Form('form', {
    attr: {
      class: 'formMessage',
      id: 'sendMessageForm',
    },
    formId: 'sendMessageForm',
    fields: [
      new Input('div', {
        attr: {
          class: 'formMessageInput',
        },
        formId: 'sendMessageForm',
        type: 'text',
        name: 'message',
        placeholder: 'Написать сообщение',
        id: 'inputMessage',
        events: {
          blur: (event: Event) => handleValidateInput(event.target as HTMLInputElement, 'sendMessageForm'),
        },
      }),
      new ImageButton('button', {
        attr: {
          type: 'submit',
          class: 'primaryButton small',
        },
        image: '<img src="/assets/arrow-right.svg" width="25px" height="25px" alt="send" />',
      }),
    ],
  }),
});

const messagesSection = new MessagesSection('section', {
  attr: {
    class: 'messages',
  },
  selectedChatId: null,
  header: messagesHeader,
  footer: messagesFooter,
  messages: [],
  modal: manageChatModal,
});

const sidebarSection = new SidebarSection('section', {
  attr: {
    class: 'sidebar',
  },
  header: chatsHeader,
  chats: chats.map(
    (chat, index) =>
      new ChatsItem('li', {
        ...chat,
        attr: { class: 'sidebarChatItem' },
        events: {
          click: () => {
            messagesSection.setProps({
              selectedChatId: chats[index].id,
              messages: chats[index].messages.map(
                (item) =>
                  new MessageItem('div', {
                    attr: {
                      class: item.isMine ? 'myMessage' : 'otherMessage',
                    },
                    message: {
                      isMine: item.isMine,
                      title: item.title,
                      createdAt: item.createdAt,
                    },
                  }),
              ),
            });
          },
        },
      }),
  ),
});

const layout = new ChatLayout('div', {
  sidebar: sidebarSection,
  messages: messagesSection,
  attr: {
    style: 'height: 100vh',
  },
});

const MessengerPage = new Page('main', {
  content: layout,
});

export default MessengerPage;
