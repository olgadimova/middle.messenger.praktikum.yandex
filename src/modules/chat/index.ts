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
import { Input, Page, Button } from 'shared/components';
import { chats } from 'shared/helpers/demo_data';
import { renderDOM } from 'shared/helpers/renderDOM';

import './components/index.scss';
import { handleValidateInput } from 'shared/helpers/input_validation';

const toggleManageChatModal = () => {
  const manageChatModal = document.getElementById('manageChatModal');

  if (manageChatModal) {
    let modalStyle = manageChatModal.style;
    modalStyle.display === 'none' ? (modalStyle.display = 'flex') : (modalStyle.display = 'none');
  }
};

const chatsHeader = new ChatsHeader('div', {
  form: new Form('form', {
    attr: {
      class: 'formSearchChat',
    },
    fields: [
      new Input('div', {
        type: 'text',
        name: 'search',
        placeholder: 'Найти Чат',
        class: 'searchInput',
      }),
    ],
  }),
});

const sidebarSection = new SidebarSection('section', {
  attr: {
    class: 'sidebar',
  },
  header: chatsHeader,
  chats: chats.map((chat) => {
    return new ChatsItem('li', { ...chat, attr: { class: 'sidebarChatItem' } });
  }),
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

const messagesFooter = new MessagesFooter('div', {
  attr: {
    class: 'chatFooter',
  },
  children: new Form('form', {
    attr: {
      class: 'formMessage',
      id: 'sendMessageForm',
    },
    fields: [
      new Input('div', {
        attr: {
          class: 'formMessageInput',
        },
        name: 'message',
        placeholder: 'Написать сообщение',
        id: 'inputMessage',
        events: {
          blur: (event: Event) => handleValidateInput(event.target as HTMLInputElement, 'sendMessageForm'),
        },
      }),
    ],
  }),
});

const messagesSection = new MessagesSection('section', {
  attr: {
    class: 'messages',
  },
  selectedChatId: 1,
  header: messagesHeader,
  footer: messagesFooter,
  messages: [
    new MessageItem('div', {
      attr: {
        class: 'myMessage',
      },
      message: {
        isMine: true,
        title: 'Привет',
        createdAt: '10:30',
      },
    }),
    new MessageItem('div', {
      attr: {
        class: 'otherMessage',
      },
      message: {
        isMine: false,
        title: 'И тебе',
        createdAt: '10:30',
      },
    }),
  ],
  modal: manageChatModal,
});

const layout = new ChatLayout('div', {
  sidebar: sidebarSection,
  messages: messagesSection,
  attr: {
    style: 'height: 100vh',
  },
});

const page = new Page('main', {
  content: layout,
});

renderDOM('#app', page);
