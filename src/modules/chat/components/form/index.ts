import Component from 'shared/services/component';
import { handleValidateInput } from 'shared/helpers/input_validation';
import tpl from './tpl';

export class Form extends Component {
  render() {
    return this.compile(tpl);
  }

  addEvents() {
    super.addEvents();

    if (this._element) {
      this._element.addEventListener('submit', (event) => this.handleSubmit(event));
    }
  }

  removeEvents() {
    super.removeEvents();

    if (this._element) {
      this._element.removeEventListener('submit', (event) => this.handleSubmit(event));
    }
  }

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    let formId = this._props.formId as string;

    const formData = new FormData(event.target as HTMLFormElement);

    const inputs = this._element?.querySelectorAll('input');

    let validationResults: boolean[] = [];

    if (inputs) {
      inputs.forEach((input) => {
        validationResults.push(handleValidateInput(input as HTMLInputElement, formId));
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
  };
}
