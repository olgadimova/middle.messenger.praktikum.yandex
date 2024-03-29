import { Component } from 'shared/services';
import { handleValidateInput } from 'shared/helpers';

import { ChatsController, UserController, MessagesController } from 'api/controllers';
import { ChatModalFormType } from 'shared/types';

import tpl from './tpl';

export class Form extends Component {
  render() {
    return this.compile(tpl);
  }

  addEvents() {
    super.addEvents();

    if (this.element) {
      this.element.addEventListener('submit', this.handleSubmit);
    }
  }

  removeEvents() {
    super.removeEvents();

    if (this.element) {
      this.element.removeEventListener('submit', this.handleSubmit);
    }
  }

  async handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formId = form.id as string;

    const inputs = document.querySelectorAll(`#${formId} input`);

    if (!inputs) {
      return;
    }

    const formData = new FormData(form);

    let validationResults: boolean[] = [];

    inputs.forEach((input) => {
      validationResults.push(handleValidateInput(input as HTMLInputElement, formId));
    });

    if (validationResults.every((isValid) => isValid)) {
      let formValues: Record<string, FormDataEntryValue> = {};

      for (let pair of formData.entries()) {
        const [key = pair[0], value = pair[1]] = [...pair];

        formValues[key] = value;
      }

      const chatsController = new ChatsController();
      const userController = new UserController();

      const formError = document.querySelector('p#formError');

      if (formError) {
        formError.textContent = '';
      }

      try {
        switch (formId) {
          case ChatModalFormType.CREATE_CHAT: {
            await chatsController.createChat(formValues as CreateChatParams);
            await chatsController.getAllChats();
            break;
          }
          case ChatModalFormType.ADD_CHAT_USER: {
            const userId = await userController.searchUserById(formValues as SearchUserParams);
            const chatId = form.getAttribute('data-chatid');

            if (userId && !!chatId) {
              await chatsController.addChatUsers({
                users: [userId],
                chatId: Number(chatId),
              });
              break;
            } else {
              formError!.textContent = 'Пользователь не найден';
              return;
            }
          }
          case ChatModalFormType.DELETE_CHAT_USER: {
            const userId = await userController.searchUserById(formValues as SearchUserParams);
            const chatId = form.getAttribute('data-chatid');

            if (userId && !!chatId) {
              await chatsController.deleteChatUsers({
                users: [userId],
                chatId: Number(chatId),
              });
              break;
            } else {
              formError!.textContent = 'Пользователь не найден';
              return;
            }
          }
          case ChatModalFormType.SEND_MESSAGE: {
            const messagesController = new MessagesController();
            messagesController.sendMessage(formValues as SendMessageParams);
            break;
          }
          default:
            break;
        }

        const currentModal = document.querySelector('.modal');

        if (currentModal) {
          (currentModal as HTMLElement).style.display = 'none';
        }
      } catch (err) {
        if (formError) {
          formError.textContent = (err as Error).message;
        }
      }
    }
  }
}
