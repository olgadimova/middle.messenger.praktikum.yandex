import { Component } from 'shared/services';

import { UserController } from 'api/controllers';

import tpl from './tpl';

export class AvatarForm extends Component {
  render() {
    return this.compile(tpl);
  }

  addEvents() {
    super.addEvents();

    if (this.element) {
      const avatarInput = this.element.querySelector('input#avatar');

      if (avatarInput) {
        avatarInput.addEventListener('change', this.handleSubmit);
      }
    }
  }

  removeEvents() {
    super.removeEvents();

    if (this.element) {
      const avatarInput = this.element.querySelector('input#avatar');

      if (avatarInput) {
        avatarInput.addEventListener('change', this.handleSubmit);
      }
    }
  }

  async handleSubmit(event: Event) {
    event.preventDefault();

    const avatarImages = (event.target as HTMLInputElement).files;

    if (!avatarImages?.length) {
      return;
    }

    const userController = new UserController();

    const formError = document.querySelector('p#avatarformError');

    if (formError) {
      formError.textContent = '';
    }

    try {
      await userController.updateAvatar({ avatar: avatarImages[0] });
    } catch (err) {
      if (formError) {
        formError.textContent = (err as Error).message;
      }
    }
  }
}
