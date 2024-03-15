import { Input, Page, AuthLayout, Button, Link } from 'shared/components';
import { AuthFormType } from 'shared/types';

const submitButton = new Button('button', {
  attr: {
    type: 'submit',
    class: 'primaryButton',
  },
  label: 'Зарегистрироваться',
});

const authForm = new AuthLayout('div', {
  attr: {
    class: 'authForm',
  },
  formId: AuthFormType.REGISTER,
  title: 'Регистрация',
  fields: [
    new Input('li', {
      attr: { class: 'formField' },
      formId: 'registerForm',
      id: 'fieldEmail',
      type: 'email',
      name: 'email',
      placeholder: 'Введите почту',
      label: 'Почта',
    }),
    new Input('li', {
      attr: { class: 'formField' },
      formId: 'registerForm',
      id: 'fieldLogin',
      type: 'text',
      name: 'login',
      placeholder: 'Введите логин',
      label: 'Логин',
    }),
    new Input('li', {
      attr: { class: 'formField' },
      formId: 'registerForm',
      id: 'fieldFirstName',
      type: 'text',
      name: 'first_name',
      placeholder: 'Введите имя',
      label: 'Имя',
    }),
    new Input('li', {
      attr: { class: 'formField' },
      formId: 'registerForm',
      id: 'fieldSecondName',
      type: 'text',
      name: 'second_name',
      placeholder: 'Введите фамилию',
      label: 'Имя',
    }),
    new Input('li', {
      attr: { class: 'formField' },
      formId: 'registerForm',
      id: 'fieldPhone',
      type: 'text',
      name: 'phone',
      placeholder: 'Введите телефон',
      label: 'Телефон',
    }),
    new Input('li', {
      attr: { class: 'formField' },
      formId: 'registerForm',
      id: 'fieldPassword',
      type: 'password',
      name: 'password',
      placeholder: 'Введите пароль',
      label: 'Пароль',
    }),
    new Input('li', {
      attr: { class: 'formField' },
      formId: 'registerForm',
      id: 'fieldCheckPassword',
      type: 'password',
      name: 'check_password',
      placeholder: 'Введите пароль еще раз',
      label: 'Пароль еще раз',
    }),
  ],
  submitButton,
  link: new Link('a', {
    label: 'Войти',
    attr: {
      href: '/',
      class: 'link',
    },
  }),
});

const RegisterPage = new Page('main', {
  content: authForm,
});

export default RegisterPage;
