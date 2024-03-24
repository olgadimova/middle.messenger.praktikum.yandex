import { messagePattern, namePattern, passwordPattern, phonePattern, loginPattern, emailPattern } from 'shared/helpers';

export const handleValidateInput = (input: HTMLInputElement, formId: string): boolean => {
  let inputErrorText = document.getElementById(`error-${formId}-${input.name}`);

  let errorText: string = '';

  let isValid = true;

  switch (input.name) {
    case 'message':
      isValid = messagePattern.test(input.value);
      errorText = 'Введите текст сообщения';
      break;
    case 'first_name':
    case 'second_name':
      isValid = namePattern.test(input.value);
      errorText = 'Введите валидное значение(содержит только буквы, начинается с заглавной буквы, допустим дефис)';
      break;
    case 'login':
      isValid = loginPattern.test(input.value);
      errorText =
        'Введите валидный логин(латиница, длина 3-20 символов, может содержать цифры, дефис и нижнее подчеркивание).';
      break;
    case 'password':
    case 'oldPassword':
    case 'newPassword':
      isValid = passwordPattern.test(input.value);
      errorText = 'Пароль должен быть длиной 8-40 знаков, включать цифру и заглавную букву';
      break;
    case 'email':
      isValid = emailPattern.test(input.value);
      errorText = 'Введите валидный электронный адрес';
      break;
    case 'phone':
      isValid = phonePattern.test(input.value);
      errorText = 'Введите валидный номер телефона(+ опционален)';
      break;
    default:
      break;
  }

  if (inputErrorText) {
    inputErrorText.innerText = isValid ? '' : errorText;
  }

  return isValid;
};

export const handleCheckPasswordValidate = (oldPasswordName: string, newPasswordName: string, formId: string) => {
  const password = document.querySelector(`input[name="${oldPasswordName}"]`) as HTMLInputElement | null;
  const passwordToCheck = document.querySelector(`input[name="${newPasswordName}"]`) as HTMLInputElement | null;

  let inputErrorText = document.getElementById(`error-${formId}-${newPasswordName}`);
  let errorText: string = '';

  let isValid = true;

  if (!password || !passwordToCheck) {
    isValid = false;
    errorText = 'Пароль должен быть длиной 8-40 знаков, включать цифру и заглавную букву';
  } else if (passwordToCheck.value !== password.value) {
    isValid = false;
    errorText = 'Пароли не совпадают';
  } else {
    isValid = passwordPattern.test(passwordToCheck.value);
    errorText = 'Пароль должен быть длиной 8-40 знаков, включать цифру и заглавную букву';
  }

  if (inputErrorText) {
    inputErrorText.innerText = isValid ? '' : errorText;
  }

  return isValid;
};
