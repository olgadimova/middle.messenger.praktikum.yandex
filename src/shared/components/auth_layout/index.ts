import Component from 'shared/services/component';
import { handleCheckPasswordValidate, handleValidateInput } from 'shared/helpers/input_validation';
import tpl from './tpl';

export class AuthLayout extends Component {
  render() {
    return this.compile(tpl);
  }

  addEvents() {
    super.addEvents();

    const authFormId = this._props.formId as string;

    const authForm: HTMLElement | null | undefined = this._element?.querySelector(`#${authFormId}`);

    const inputs = this._element?.querySelectorAll(`#${authFormId} input`);

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

    const authFormId = this._props.formId as string;

    const authForm: HTMLElement | null | undefined = this._element?.querySelector(`#${authFormId}`);

    const inputs = this._element?.querySelectorAll(`#${authFormId} input`);

    if (authForm) {
      authForm?.removeEventListener('submit', this.handleSubmit);
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

    if (input.name === 'check_password') {
      handleCheckPasswordValidate('password', 'check_password', formId);
    } else {
      handleValidateInput(input, formId);
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const authFormId = form.id;
    const inputs = document.querySelectorAll(`#${authFormId} input`);

    if (!inputs) {
      return;
    }

    const formData = new FormData(form);

    let validationResults: boolean[] = [];

    if (inputs && authFormId) {
      inputs.forEach((input) => {
        validationResults.push(
          (input as HTMLInputElement).name === 'check_password'
            ? handleCheckPasswordValidate('password', 'check_password', authFormId)
            : handleValidateInput(input as HTMLInputElement, authFormId),
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
