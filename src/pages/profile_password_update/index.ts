import { LabeledInput, Page, ProfileHeader, ProfileLayout, Button, BackButton } from 'shared/components';
import { ProfileFormType } from 'shared/types';

const profileHeader = new ProfileHeader('div', {
  attr: {
    class: 'profileHeader',
  },
  userName: 'Иван',
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
  formId: ProfileFormType.PASSWORD,
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

const ProfilePasswordUpdatePage = new Page('main', {
  content: profileLayout,
});

export default ProfilePasswordUpdatePage;
