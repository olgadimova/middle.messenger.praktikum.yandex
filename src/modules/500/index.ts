import { Page } from 'shared/components';
import { renderDOM } from 'shared/helpers/renderDOM';
import tpl from './tpl';

const page = new Page('main', {
  content: tpl,
});

renderDOM('#app', page);
