import { Input, Page, AuthLayout, Button, Link } from 'shared/components';
import { AuthFormType } from 'shared/types';

const submitButton = new Button('button', {
  attr: {
    type: 'submit',
    class: 'primaryButton',
  },
  label: 'Войти',
});

const authForm = new AuthLayout('div', {
  attr: {
    class: 'authForm',
    id: 'loginForm',
  },
  formId: AuthFormType.LOGIN,
  title: 'Вход',
  fields: [
    new Input('li', {
      attr: { class: 'formField' },
      formId: 'loginForm',
      id: 'fieldLogin',
      type: 'text',
      name: 'login',
      placeholder: 'Введите логин',
      label: 'Логин',
    }),
    new Input('li', {
      attr: { class: 'formField' },
      formId: 'loginForm',
      id: 'fieldPassword',
      type: 'password',
      name: 'password',
      placeholder: 'Введите пароль',
      label: 'Пароль',
    }),
  ],
  submitButton,
  link: new Link('a', {
    label: 'Нет Аккаунта?',
    attr: {
      href: '/sign-up',
      class: 'link',
    },
  }),
});

const LoginPage = new Page('main', {
  content: authForm,
});

export default LoginPage;
