import Component from 'shared/services/component';
import tpl from './tpl';

export class Modal extends Component {
  render() {
    return this.compile(tpl);
  }

  addEvents() {
    super.addEvents();

    const closeModalButton = this._element?.querySelector('.closeModal');

    if (closeModalButton) {
      closeModalButton.addEventListener('click', () => {
        if (this._element) {
          this._element.style.display = 'none';
        }
      });
    }
  }
}
