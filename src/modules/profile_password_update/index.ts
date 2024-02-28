import { LabeledInput, Page, ProfileHeader, ProfileLayout, Button, BackButton } from 'shared/components';
import { renderDOM } from 'shared/helpers/renderDOM';

const profileHeader = new ProfileHeader('div', {
  attr: {
    class: 'profileHeader',
  },
  userName: 'Иван',
});

const submitButton = new Button('div', {
  type: 'submit',
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
  formId: 'passwordUpdateForm',
  fields: [
    new LabeledInput('li', {
      attr: { class: 'labeledInputField' },
      formId: 'passwordUpdateForm',
      id: 'inputOldPassword',
      type: 'password',
      name: 'oldPassword',
      placeholder: '***',
      value: '',
      label: 'Старый Пароль',
    }),
    new LabeledInput('li', {
      attr: { class: 'labeledInputField' },
      formId: 'passwordUpdateForm',
      id: 'inputNewPassword',
      type: 'password',
      name: 'newPassword',
      placeholder: '***',
      value: '',
      label: 'Новый Пароль',
    }),
    new LabeledInput('li', {
      attr: { class: 'labeledInputField' },
      formId: 'passwordUpdateForm',
      id: 'inputCheckNewPassword',
      type: 'password',
      name: 'checkNewPassword',
      placeholder: '***',
      value: '',
      label: 'Повторите Новый Пароль',
    }),
  ],
  submitButton,
  backButton,
});

const page = new Page('main', {
  content: profileLayout,
});

renderDOM('#app', page);
