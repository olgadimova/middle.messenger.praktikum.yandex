import { AuthController } from 'api/controllers';

import {
  LabeledInput,
  ProfileHeader,
  ProfileLayout,
  Button,
  BackButton,
  ConnectedPage,
  AvatarForm,
} from 'shared/components';

import { ProfileFormType } from 'shared/types';

const authController = new AuthController();

const profileHeader = new ProfileHeader('div', {
  attr: {
    class: 'profileHeader',
  },
  userName: 'Иван',
  canEditAvatar: true,
  editAvatarForm: new AvatarForm('div', {
    attr: {
      id: 'updateAvatarForm',
    },
  }),
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
  formId: ProfileFormType.INFO,
  fields: [],
  submitButton,
  backButton,
});

const ProfileUpdatePage = new ConnectedPage('main', {
  content: profileLayout,
});

ProfileUpdatePage.componentDidMount = async () => {
  await authController.getUser();

  const { user } = ProfileUpdatePage.props;

  if (user) {
    const userInfo = user as UserObject;

    if (userInfo.avatar) {
      profileHeader.setProps({ avatarSrc: userInfo.avatar });
    }

    profileLayout.setProps({
      fields: [
        new LabeledInput('li', {
          attr: { class: 'labeledInputField' },
          formId: 'profileUpdateForm',
          id: 'inputEmail',
          type: 'text',
          name: 'email',
          placeholder: 'pochta@smth.com',
          value: userInfo.email,
          label: 'Почта',
        }),
        new LabeledInput('li', {
          attr: { class: 'labeledInputField' },
          formId: 'profileUpdateForm',
          id: 'inputLogin',
          type: 'text',
          name: 'login',
          placeholder: 'ivanchik',
          value: userInfo.login,
          label: 'Логин',
        }),
        new LabeledInput('li', {
          attr: { class: 'labeledInputField' },
          formId: 'profileUpdateForm',
          id: 'inputDisplayName',
          type: 'text',
          name: 'display_name',
          placeholder: 'Иван',
          value: userInfo.email,
          label: 'Имя в чате',
        }),
        new LabeledInput('li', {
          attr: { class: 'labeledInputField' },
          formId: 'profileUpdateForm',
          id: 'inputFirstName',
          type: 'text',
          name: 'first_name',
          placeholder: 'Ваня',
          value: userInfo.first_name,
          label: 'Имя',
        }),
        new LabeledInput('li', {
          attr: { class: 'labeledInputField' },
          formId: 'profileUpdateForm',
          id: 'inputSecondName',
          type: 'text',
          name: 'second_name',
          placeholder: 'Иванов',
          value: userInfo.second_name,
          label: 'Фамилия',
        }),
        new LabeledInput('li', {
          attr: { class: 'labeledInputField' },
          formId: 'profileUpdateForm',
          id: 'inputPhone',
          type: 'text',
          name: 'phone',
          placeholder: '+7 777 77 77 77',
          value: userInfo.phone,
          label: 'Телефон',
        }),
      ],
    });
  }
};

export default ProfileUpdatePage;
