import { Component } from 'shared/services';
import { handleCheckPasswordValidate, handleValidateInput } from 'shared/helpers';

import tpl from './tpl';

export class ProfileLayout extends Component {
  render() {
    return this.compile(tpl);
  }

  addEvents() {
    super.addEvents();

    const authFormId = this.props.formId as string;

    const authForm: HTMLElement | null | undefined = this.element?.querySelector(`#${authFormId}`);

    const inputs = this.element?.querySelectorAll(`#${authFormId} input`);

    if (authForm) {
      authForm?.addEventListener('submit', this.handleSubmit);
    }

    if (inputs) {
      inputs.forEach((input) => {
        input.addEventListener('blur', this.handleOnBlurInput);
      });
    }
  }

  removeEvents() {
    super.removeEvents();

    const formId = this.props.formId as string;
    const profileForm: HTMLElement | null | undefined = this.element?.querySelector(`#${formId}`);
    const inputs = this.element?.querySelectorAll(`#${formId} input`);

    if (profileForm) {
      profileForm.removeEventListener('submit', this.handleSubmit);
    }

    if (inputs) {
      inputs.forEach((input) => {
        input.removeEventListener('blur', this.handleOnBlurInput);
      });
    }
  }

  handleOnBlurInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const formId = input.getAttribute('data-formid');

    if (!formId) return;

    if (input.name === 'checkNewPassword') {
      handleCheckPasswordValidate('newPassword', 'checkNewPassword', formId);
    } else {
      handleValidateInput(input, formId);
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formId = form.id as string;
    const inputs = document.querySelectorAll(`#${formId} input`);

    if (!inputs) {
      return;
    }

    const formData = new FormData(form);

    let validationResults: boolean[] = [];

    if (inputs && formId) {
      inputs.forEach((input) => {
        validationResults.push(
          (input as HTMLInputElement).name === 'checkNewPassword'
            ? handleCheckPasswordValidate('newPassword', 'checkNewPassword', formId)
            : handleValidateInput(input as HTMLInputElement, formId),
        );
      });
    }

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
