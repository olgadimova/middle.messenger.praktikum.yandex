import { AuthController } from 'api/controllers';
import { LabeledField, ProfileHeader, ProfileLayout, BackButton, Link, ConnectedPage } from 'shared/components';
import { isEqual } from 'shared/helpers';

import { Router } from 'shared/services';

const authController = new AuthController();

const backButton = new BackButton('div', {
  attr: {
    class: 'backButtonContainer',
  },
  to: '/messenger',
});

const profileHeader = new ProfileHeader('div', {
  attr: {
    class: 'profileHeader',
  },
  userName: 'Иван',
});

const profileLayout = new ProfileLayout('div', {
  attr: {
    class: 'profile',
  },
  profileHeader,
  fields: [],
  backButton,
  profileFooter: [
    new Link('a', {
      label: 'Изменить данные',
      attr: {
        href: '/settings',
        class: 'link withSeparator',
      },
    }),
    new Link('a', {
      label: 'Изменить пароль',
      attr: {
        href: '/settings-password',
        class: 'link withSeparator',
      },
    }),
    new Link('a', {
      label: 'Выйти',
      attr: {
        href: '/',
        class: 'link logoutButton',
      },
      events: {
        click: async (e: Event) => {
          e.preventDefault();

          await authController.logout();
          const router = Router.getInstance();
          router.go('/');
        },
      },
    }),
  ],
});

const ProfilePage = new ConnectedPage('main', {
  content: profileLayout,
});

ProfilePage.componentDidMount = async () => {
  await authController.getUser();
};

ProfilePage.componentDidUpdate = (oldProps, newProps) => {
  if (
    (!oldProps.state?.user && !!newProps.state?.user) ||
    (oldProps.state?.user && newProps.state?.user && !isEqual(oldProps.state.user, newProps.state.user))
  ) {
    const { user } = newProps.state;

    if (user) {
      if (user.avatar) {
        profileHeader.setProps({ avatarSrc: user.avatar, userName: user.first_name });
      }

      profileLayout.setProps({
        fields: [
          new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Почта', value: user.email }),
          new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Логин', value: user.login }),
          new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Имя', value: user.first_name }),
          new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Фамилия', value: user.second_name }),
          new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Имя в чате', value: user.display_name }),
          new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Телефон', value: user.phone }),
        ],
      });
    }

    return true;
  }

  return false;
};

export default ProfilePage;
