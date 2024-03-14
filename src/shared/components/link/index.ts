import { Component, Router } from 'shared/services';

import tpl from './tpl';

export class Link extends Component {
  render() {
    return this.compile(tpl);
  }

  handleRedirect(e: Event) {
    e.preventDefault();

    const href = (e.target as HTMLElement).getAttribute('href');

    if (href) {
      const router = Router.getInstance();
      router.go(href);
    }
  }

  addEvents() {
    this.element?.addEventListener('click', this.handleRedirect);
  }

  removeEvents() {
    this.element?.removeEventListener('click', this.handleRedirect);
  }
}
