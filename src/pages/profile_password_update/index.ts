import { AuthController } from 'api/controllers';
import { LabeledInput, ProfileHeader, ProfileLayout, Button, BackButton, ConnectedPage } from 'shared/components';
import { ProfileFormType } from 'shared/types';

const authController = new AuthController();

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

const ProfilePasswordUpdatePage = new ConnectedPage('main', {
  content: profileLayout,
});

ProfilePasswordUpdatePage.componentDidMount = async () => {
  await authController.getUser();

  if (!ProfilePasswordUpdatePage.props.state) {
    return;
  }

  const { user } = ProfilePasswordUpdatePage.props.state;

  if (user) {
    if (user.avatar) {
      profileHeader.setProps({ avatarSrc: user.avatar });
    }
  }
};

export default ProfilePasswordUpdatePage;
