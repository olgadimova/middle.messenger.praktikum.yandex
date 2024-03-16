import { Component } from 'shared/services';
import { handleCheckPasswordValidate, handleValidateInput } from 'shared/helpers';

import { AuthFormType } from 'shared/types';
import { AuthController } from 'api/controllers';

import tpl from './tpl';

export class AuthLayout extends Component {
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

    const authFormId = this.props.formId as string;

    const authForm: HTMLElement | null | undefined = this.element?.querySelector(`#${authFormId}`);

    const inputs = this.element?.querySelectorAll(`#${authFormId} input`);

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

  async handleSubmit(event: Event) {
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
      let formValues: Record<string, string> = {};

      for (let pair of formData.entries()) {
        const [key = pair[0], value = pair[1]] = [...pair];
        formValues[key] = value.toString();
      }

      const authController = new AuthController();
      const formError = document.querySelector('#formError');

      try {
        switch (authFormId) {
          case AuthFormType.LOGIN: {
            await authController.login(formValues as LoginParams);
            break;
          }
          case AuthFormType.REGISTER: {
            await authController.register(formValues as RegisterParams);
            break;
          }
          default:
            break;
        }
        if (formError) {
          formError.textContent = '';
        }
      } catch (err) {
        if (formError) {
          formError.textContent = (err as Error).message;
        }
      }
    }
  }
}
