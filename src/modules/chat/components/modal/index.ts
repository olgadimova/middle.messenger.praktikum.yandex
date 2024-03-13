import { Component } from 'shared/services';

import tpl from './tpl';

export class Modal extends Component {
  render() {
    return this.compile(tpl);
  }

  toggleModal = () => {
    if (this.element) {
      this.element.style.display = 'none';
    }
  };

  addEvents() {
    super.addEvents();

    const closeModalButton = this.element?.querySelector('.closeModal');

    if (closeModalButton) {
      closeModalButton.addEventListener('click', this.toggleModal);
    }
  }

  removeEvents() {
    super.removeEvents();

    const closeModalButton = this.element?.querySelector('.closeModal');

    if (closeModalButton) {
      closeModalButton.removeEventListener('click', this.toggleModal);
    }
  }
}
