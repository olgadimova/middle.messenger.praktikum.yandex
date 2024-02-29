import { Input, Page, AuthLayout, Button } from 'shared/components';
import { renderDOM } from 'shared/helpers/renderDOM';

const submitButton = new Button('div', {
  type: 'submit',
  label: 'Войти',
});

const authForm = new AuthLayout('div', {
  attr: {
    class: 'authForm',
  },
  formId: 'loginForm',
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
  backTo: '/register',
});

const page = new Page('main', {
  content: authForm,
});

renderDOM('#app', page);
