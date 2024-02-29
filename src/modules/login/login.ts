import { handleValidateInput } from 'shared/helpers/input_validation';

window.onload = function () {
  const formId = 'loginForm';

  const loginForm: HTMLElement | null = document.getElementById(formId);
  const inputs = document.querySelectorAll(`#${formId} input`);

  function handleLogin(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    let validationResults: boolean[] = [];

    if (inputs) {
      inputs.forEach((input) => {
        validationResults.push(handleValidateInput(input as HTMLInputElement, formId));
      });
    }

    if (validationResults.every((isValid) => isValid)) {
      console.log(formData.toString());
    }
  }

  loginForm?.addEventListener('submit', handleLogin);

  // Валидация полей формы логина
  if (inputs) {
    inputs.forEach((input) => {
      input.addEventListener('blur', (event) => handleValidateInput(event.target as HTMLInputElement, formId));
    });
  }
};
