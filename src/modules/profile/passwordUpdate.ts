import { handleCheckPasswordValidate, handleValidateInput } from '../../shared/helpers/input_validation';

window.onload = function () {
  const formId = 'passwordUpdateForm';

  const profileUpdateForm: HTMLElement | null = document.getElementById(formId);
  const inputs = document.querySelectorAll(`#${formId} input`);

  function handleUpdatePassword(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    let validationResults: boolean[] = [];

    if (inputs) {
      inputs.forEach((input) => {
        if ((input as HTMLInputElement).name === 'checkNewPassword') {
          validationResults.push(handleCheckPasswordValidate('newPassword', 'checkNewPassword', formId));
        } else {
          validationResults.push(handleValidateInput(input as HTMLInputElement, formId));
        }
      });
    }

    if (validationResults.every((isValid) => isValid)) {
      console.log(formData.toString());
    }
  }

  profileUpdateForm?.addEventListener('submit', handleUpdatePassword);

  // Валидация полей формы обновления профиля
  if (inputs) {
    inputs.forEach((input) => {
      input.addEventListener('blur', (event) => {
        if ((input as HTMLInputElement).name === 'checkNewPassword') {
          handleCheckPasswordValidate('newPassword', 'checkNewPassword', formId);
        } else {
          handleValidateInput(event.target as HTMLInputElement, formId);
        }
      });
    });
  }
};
