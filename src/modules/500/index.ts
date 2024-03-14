import { ErrorPageLayout, Link, Page } from 'shared/components';

const pageContent = new ErrorPageLayout('div', {
  errorCode: '500',
  errorDescription: 'Мы уже фиксим',
  linkToChat: new Link('a', {
    label: 'Назад к чатам',
    attr: {
      href: '/messenger',
      class: 'link',
    },
  }),
});

const ErrorPage500 = new Page('main', {
  content: pageContent,
});

export default ErrorPage500;
