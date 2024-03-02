import Component from 'shared/services/component';
import tpl from './tpl';
import { handleValidateInput } from 'shared/helpers/input_validation';

export class Form extends Component {
  render() {
    return this.compile(tpl);
  }

  addEvents() {
    super.addEvents();

    let formId = this._props.formId as string;

    if (this._element) {
      this._element.addEventListener('submit', (event) => {
        event.preventDefault();

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

          for (var pair of formData.entries()) {
            formValues[pair[0]] = pair[1];
          }

          console.log(formValues);
        }
      });
    }
  }
}
