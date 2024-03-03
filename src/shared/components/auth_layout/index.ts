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
      authForm?.addEventListener('submit', (event) => this.handleSubmit(event, inputs));
    }

    if (inputs) {
      inputs.forEach((input) => {
        input.addEventListener('blur', (event) =>
          (input as HTMLInputElement).name === 'check_password'
            ? handleCheckPasswordValidate('password', 'check_password', authFormId)
            : handleValidateInput(event.target as HTMLInputElement, authFormId),
        );
      });
    }
  }

  handleSubmit(event: Event, inputs?: NodeListOf<Element>) {
    event.preventDefault();

    if (!inputs) {
      return;
    }

    const authFormId = this._props.formId as string;

    const formData = new FormData(event.target as HTMLFormElement);

    let validationResults: boolean[] = [];

    if (inputs && this._props.formId) {
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
