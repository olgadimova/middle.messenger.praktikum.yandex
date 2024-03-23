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
import { isEqual } from 'shared/helpers';

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
  errorText: '',
});

const ProfileUpdatePage = new ConnectedPage('main', {
  content: profileLayout,
});

ProfileUpdatePage.componentDidMount = async () => {
  profileLayout.setProps({
    errorText: '',
  });

  await authController.getUser();
};

ProfileUpdatePage.componentDidUpdate = (oldProps, newProps) => {
  const isFirstLoad = !oldProps.state?.user && !!newProps.state?.user;

  const isAfterUpdate =
    oldProps.state?.user && newProps.state?.user && !isEqual(oldProps.state.user, newProps.state.user);

  if ((isFirstLoad || isAfterUpdate) && newProps.state) {
    const { user } = newProps.state;

    if (user) {
      if (user.avatar) {
        profileHeader.setProps({ avatarSrc: user.avatar, userName: user.first_name });
      }

      profileLayout.setProps({
        errorText: isAfterUpdate ? 'Данные успешно обновлены!' : '',
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
            placeholder: 'ivan1',
            value: user.display_name,
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
      });

      return true;
    }
  }
  return false;
};

export default ProfileUpdatePage;
