import {
  ChatsHeader,
  Form,
  ChatsItem,
  Sidebar,
  MessagesHeader,
  MessagesFooter,
  Messages,
  ChatLayout,
  MessageItem,
  Modal,
} from './components';
import { Input, Page, Button } from 'shared/components';
import { chats } from 'shared/helpers/demo_data';
import { renderDOM } from 'shared/helpers/renderDOM';

import './components/index.scss';

const chatsHeader = new ChatsHeader('div', {
  form: new Form('form', {
    attr: {
      class: 'formSearchChat',
    },
    fields: [
      new Input('div', {
        type: 'text',
        name: 'search',
        placeholder: '&#128269;  Поиск',
        class: 'searchInput',
      }),
    ],
  }),
});

const sidebarSection = new Sidebar('section', {
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
  actions: [
    new Button('div', { type: 'button', value: 'addChatUser', label: 'Добавить Пользователя', class: 'chatControls' }),
    new Button('div', {
      type: 'button',
      value: 'deleteChatUser',
      label: 'Удалить Пользователя',
      class: 'chatControls',
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
    fields: [
      new Input('div', {
        attr: {
          class: 'formMessageInput',
        },
        name: 'message',
        placeholder: 'Написать сообщение',
        id: 'inputMessage',
      }),
    ],
  }),
});

const manageChatModalAdd = new Modal('div', {
  attr: {
    class: 'modal',
    role: 'dialog',
    style: 'display: none',
    id: 'addChatUser',
  },
  title: 'Добавить пользователя',
  modalId: 'addChatUser',
  fields: [
    new Input('div', {
      id: 'modalInput',
      type: 'text',
      name: 'login',
      placeholder: 'Введите имя пользователя',
      label: 'Логин',
      class: 'searchInput',
    }),
    new Button('div', {
      type: 'submit',
      label: 'Добавить',
    }),
  ],
});

const manageChatModalDelete = new Modal('div', {
  attr: {
    class: 'modal',
    role: 'dialog',
    style: 'display: none',
    id: 'deleteChatUser',
  },
  modalId: 'deleteChatUser',
  title: 'Удалить пользователя',
  fields: [
    new Input('div', {
      id: 'modalInput',
      type: 'text',
      name: 'login',
      placeholder: 'Введите имя пользователя',
      label: 'Логин',
      class: 'searchInput',
    }),
    new Button('div', {
      type: 'submit',
      label: 'Удалить',
    }),
  ],
});

const messagesSection = new Messages('section', {
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
  modal: manageChatModalAdd,
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
