import { handleCheckPasswordValidate, handleValidateInput } from '../../shared/helpers/input_validation';

window.onload = function () {
  const formId = 'registerForm';

  const registerForm: HTMLElement | null = document.getElementById(formId);
  const inputs = document.querySelectorAll(`#${formId} input`);

  function handleRegister(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    let validationResults: boolean[] = [];

    if (inputs) {
      inputs.forEach((input) => {
        if ((input as HTMLInputElement).name === 'check_password') {
          validationResults.push(handleCheckPasswordValidate('password', 'check_password', formId));
        } else {
          validationResults.push(handleValidateInput(input as HTMLInputElement, formId));
        }
      });
    }

    if (validationResults.every((isValid) => isValid)) {
      console.log(formData.toString());
    }
  }

  registerForm?.addEventListener('submit', handleRegister);

  // Валидация полей формы регистрации
  if (inputs) {
    inputs.forEach((input) => {
      input.addEventListener('blur', (event) => {
        if ((input as HTMLInputElement).name === 'check_password') {
          handleCheckPasswordValidate('password', 'check_password', formId);
        } else {
          handleValidateInput(event.target as HTMLInputElement, formId);
        }
      });
    });
  }
};
