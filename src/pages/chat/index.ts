import { Input, Button, Link, ConnectedPage } from 'shared/components';
import { handleValidateInput, isEqual } from 'shared/helpers';
import { AuthController, ChatsController, MessagesController } from 'api/controllers';
import { ChatModalFormType } from 'shared/types';

import {
  ChatsHeader,
  Form,
  SidebarSection,
  MessagesHeader,
  MessagesFooter,
  ConnectedMessagesSection,
  ChatLayout,
  Modal,
  ImageButton,
  ChatsItem,
} from './components';

import './components/index.scss';

const chatsController = new ChatsController();
const messagesController = new MessagesController();
const authController = new AuthController();

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
  formId: ChatModalFormType.ADD_CHAT_USER,
  type: 'text',
  name: 'login',
  placeholder: 'Введите имя пользователя',
  label: 'Логин',
  class: 'searchInput',
});

const manageChatModalForm = new Form('form', {
  attr: {
    class: 'modalForm',
    id: ChatModalFormType.ADD_CHAT_USER,
  },
  formId: ChatModalFormType.ADD_CHAT_USER,
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

const chatsHeader = new ChatsHeader('div', {
  createChatButton: new ImageButton('button', {
    attr: {
      class: 'imageButton',
    },
    image: '<img src="/assets/plus.svg" width="20px" height="20px" alt="create chat" />',
    events: {
      click: () => {
        manageChatModalInput.setProps({
          formId: ChatModalFormType.CREATE_CHAT,
        });

        manageChatModalInput.setProps({
          id: 'modalInput',
          formId: ChatModalFormType.CREATE_CHAT,
          type: 'text',
          name: 'title',
          placeholder: 'Введите название чата',
          label: 'Название',
        });

        manageChatModalSubmitButton.setProps({
          label: 'Создать',
        });

        manageChatModalForm.setProps({
          attr: {
            id: ChatModalFormType.CREATE_CHAT,
          },
          formId: ChatModalFormType.CREATE_CHAT,
        });

        manageChatModal.setProps({
          attr: {
            style: 'display: flex',
          },
          title: 'Создать Чат',
        });
      },
    },
  }),
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

const sidebarSection = new SidebarSection('section', {
  attr: {
    class: 'sidebar',
  },
  header: chatsHeader,
  chats: [],
  chatsLength: 0,
  selectedChatId: null,
});

const messagesHeader = new MessagesHeader('nav', {
  attr: {
    class: 'chatHeader',
  },
  deleteChatButton: new ImageButton('button', {
    attr: {
      class: 'imageButton',
    },
    image: '<img src="/assets/trash.svg" width="22px" height="22px" alt="delete chat" />',
    events: {
      click: async () => {
        // eslint-disable-next-line no-restricted-globals, no-alert
        if (confirm('Вы уверены, что хотите удалить этот чат?')) {
          await chatsController.deleteChat({ id: sidebarSection.props.selectedChatId as number });
          await chatsController.getAllChats();
          messagesSection.setProps({
            selectedChatId: null,
          });
        }
      },
    },
  }),
  manageChatButton: new ImageButton('button', {
    attr: {
      class: 'imageButton',
    },
    image: '<img src="/assets/more.svg" width="25px" height="25px" alt="manage chat" />',
    events: {
      click: toggleManageChatModal,
    },
  }),
  actions: [
    new Button('button', {
      attr: {
        type: 'button',
        value: ChatModalFormType.ADD_CHAT_USER,
        class: 'primaryButton chatControls',
      },
      label: 'Добавить Пользователя',
      events: {
        click: () => {
          toggleManageChatModal();

          manageChatModalInput.setProps({
            formId: ChatModalFormType.ADD_CHAT_USER,
          });

          manageChatModalInput.setProps({
            id: 'modalInput',
            formId: ChatModalFormType.ADD_CHAT_USER,
            type: 'text',
            name: 'login',
            placeholder: 'Введите имя пользователя',
            label: 'Логин',
          });

          manageChatModalSubmitButton.setProps({
            label: 'Добавить',
          });

          manageChatModalForm.setProps({
            attr: {
              id: ChatModalFormType.ADD_CHAT_USER,
              'data-chatid': (sidebarSection.props.selectedChatId as number).toString(),
            },
            formId: ChatModalFormType.ADD_CHAT_USER,
          });

          manageChatModal.setProps({
            attr: {
              style: 'display: flex',
            },
            title: 'Добавить Пользователя',
            modalId: ChatModalFormType.DELETE_CHAT_USER,
          });
        },
      },
    }),
    new Button('button', {
      attr: {
        class: 'primaryButton chatControls',
        type: 'button',
        value: ChatModalFormType.DELETE_CHAT_USER,
      },
      label: 'Удалить Пользователя',
      events: {
        click: () => {
          toggleManageChatModal();

          manageChatModalInput.setProps({
            formId: ChatModalFormType.DELETE_CHAT_USER,
          });

          manageChatModalInput.setProps({
            id: 'modalInput',
            formId: ChatModalFormType.DELETE_CHAT_USER,
            type: 'text',
            name: 'login',
            placeholder: 'Введите имя пользователя',
            label: 'Логин',
          });

          manageChatModalSubmitButton.setProps({
            label: 'Удалить',
          });

          manageChatModalForm.setProps({
            attr: {
              id: ChatModalFormType.DELETE_CHAT_USER,
              'data-chatid': (sidebarSection.props.selectedChatId as number).toString(),
            },
            formId: ChatModalFormType.DELETE_CHAT_USER,
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

const messagesSection = new ConnectedMessagesSection('section', {
  attr: {
    class: 'messages',
  },
  selectedChatId: null,
  header: messagesHeader,
  footer: messagesFooter,
  messages: [],
});

const layout = new ChatLayout('div', {
  attr: {
    style: 'height: 100vh',
  },
  sidebar: sidebarSection,
  messages: messagesSection,
  modal: manageChatModal,
});

const MessengerPage = new ConnectedPage('main', {
  content: layout,
});

MessengerPage.componentDidMount = async () => {
  await chatsController.getAllChats();
};

MessengerPage.componentDidUpdate = (oldProps, newProps) => {
  if (oldProps.state && newProps.state && !isEqual(oldProps.state.chats, newProps.state.chats)) {
    const { chats } = newProps.state;

    if (chats) {
      sidebarSection.setProps({
        chatsLength: chats.length,
        chats: chats.map(
          (chat: ChatObject) =>
            new ChatsItem('li', {
              ...chat,
              last_message: {
                ...chat.last_message,
                time: chat.last_message ? new Date(chat.last_message.time).toLocaleString() : '',
              },
              avatarSrc: chat.avatar,
              attr: { class: 'sidebarChatItem', id: chat.id.toString() },
              events: {
                click: async () => {
                  sidebarSection.setProps({
                    selectedChatId: chat.id,
                  });

                  const token = await chatsController.getChatToken({ chatId: chat.id });
                  const user = await authController.getUser();

                  if (token && user) {
                    await messagesController.loadChat({ chatId: chat.id, token, userId: user.id });
                    const usersLength = await chatsController.getChatUsers({ id: chat.id });

                    messagesSection.setProps({
                      selectedChatId: chat.id,
                    });

                    messagesHeader.setProps({
                      chatTitle: chat.title,
                      avatar: chat.avatar,
                      usersLength,
                    });
                  }
                },
              },
            }),
        ),
      });
    }

    return true;
  }

  return false;
};

export default MessengerPage;
