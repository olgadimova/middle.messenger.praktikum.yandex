import { Component } from 'shared/services';
import { handleValidateInput } from 'shared/helpers';

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

  handleSubmit(event: SubmitEvent) {
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

      console.log(formValues);
    }
  }
}
