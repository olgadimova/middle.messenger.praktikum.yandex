import { AuthController } from 'api/controllers';
import { LabeledField, Page, ProfileHeader, ProfileLayout, BackButton, Link } from 'shared/components';
import { user } from 'shared/helpers';
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
  fields: [
    new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Почта', value: user.email }),
    new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Логин', value: user.login }),
    new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Имя', value: user.first_name }),
    new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Фамилия', value: user.second_name }),
    new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Имя в чате', value: user.display_name }),
    new LabeledField('li', { attr: { class: 'labeledField' }, title: 'Телефон', value: user.phone }),
  ],
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

const ProfilePage = new Page('main', {
  content: profileLayout,
});

ProfilePage.componentDidMount = async () => {
  await authController.getUser();
};

export default ProfilePage;
