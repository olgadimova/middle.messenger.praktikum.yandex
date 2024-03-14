import { Link, Page, ErrorPageLayout } from 'shared/components';

const pageContent = new ErrorPageLayout('div', {
  errorCode: '404',
  errorDescription: 'Не туда попали',
  linkToChat: new Link('a', {
    label: 'Назад к чатам',
    attr: {
      href: '/messenger',
      class: 'link',
    },
  }),
});

const ErrorPage404 = new Page('main', {
  content: pageContent,
});

export default ErrorPage404;
