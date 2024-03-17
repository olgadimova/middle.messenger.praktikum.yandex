import { AuthController } from 'api/controllers';
import { LabeledField, ProfileHeader, ProfileLayout, BackButton, Link, ConnectedPage } from 'shared/components';

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

  const { user } = ProfilePage.props;

  if (user) {
    const userInfo = user as UserObject;

    if (userInfo.avatar) {
      profileHeader.setProps({ avatarSrc: userInfo.avatar });
    }

    profileLayout.setProps({
      fields: [
        new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Почта', value: userInfo.email }),
        new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Логин', value: userInfo.login }),
        new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Имя', value: userInfo.first_name }),
        new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Фамилия', value: userInfo.second_name }),
        new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Имя в чате', value: userInfo.display_name }),
        new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Телефон', value: userInfo.phone }),
      ],
    });
  }
};

export default ProfilePage;
