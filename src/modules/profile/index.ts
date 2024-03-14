import { LabeledField, Page, ProfileHeader, ProfileLayout, BackButton, Link } from 'shared/components';
import { user } from 'shared/helpers';

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
    }),
  ],
});

const ProfilePage = new Page('main', {
  content: profileLayout,
});

export default ProfilePage;
