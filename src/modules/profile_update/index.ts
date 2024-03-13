import { LabeledInput, Page, ProfileHeader, ProfileLayout, Button, BackButton } from 'shared/components';
import { renderDOM, user } from 'shared/helpers';

const profileHeader = new ProfileHeader('div', {
  attr: {
    class: 'profileHeader',
  },
  userName: 'Иван',
  canEditAvatar: true,
});

const submitButton = new Button('button', {
  attr: {
    type: 'submit',
    class: 'primaryButton',
  },
  label: 'Сохранить',
});

const backButton = new BackButton('div', {
  attr: {
    class: 'backButtonContainer',
  },
  to: '/profile',
});

const profileLayout = new ProfileLayout('div', {
  attr: {
    class: 'profile',
  },
  profileHeader,
  isForm: true,
  formId: 'profileUpdateForm',
  fields: [
    new LabeledInput('li', {
      attr: { class: 'labeledInputField' },
      formId: 'profileUpdateForm',
      id: 'inputEmail',
      type: 'text',
      name: 'email',
      placeholder: 'pochta@smth.com',
      value: user.email,
      label: 'Почта',
    }),
    new LabeledInput('li', {
      attr: { class: 'labeledInputField' },
      formId: 'profileUpdateForm',
      id: 'inputLogin',
      type: 'text',
      name: 'login',
      placeholder: 'ivanchik',
      value: user.login,
      label: 'Логин',
    }),
    new LabeledInput('li', {
      attr: { class: 'labeledInputField' },
      formId: 'profileUpdateForm',
      id: 'inputDisplayName',
      type: 'text',
      name: 'display_name',
      placeholder: 'Иван',
      value: user.email,
      label: 'Имя в чате',
    }),
    new LabeledInput('li', {
      attr: { class: 'labeledInputField' },
      formId: 'profileUpdateForm',
      id: 'inputFirstName',
      type: 'text',
      name: 'first_name',
      placeholder: 'Ваня',
      value: user.first_name,
      label: 'Имя',
    }),
    new LabeledInput('li', {
      attr: { class: 'labeledInputField' },
      formId: 'profileUpdateForm',
      id: 'inputSecondName',
      type: 'text',
      name: 'second_name',
      placeholder: 'Иванов',
      value: user.second_name,
      label: 'Фамилия',
    }),
    new LabeledInput('li', {
      attr: { class: 'labeledInputField' },
      formId: 'profileUpdateForm',
      id: 'inputPhone',
      type: 'text',
      name: 'phone',
      placeholder: '+7 777 77 77 77',
      value: user.phone,
      label: 'Телефон',
    }),
  ],
  submitButton,
  backButton,
});

const page = new Page('main', {
  content: profileLayout,
});

renderDOM('#app', page);
