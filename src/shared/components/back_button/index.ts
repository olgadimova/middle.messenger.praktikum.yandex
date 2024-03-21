import { Component, Router } from 'shared/services';

import tpl from './tpl';

export class BackButton extends Component {
  render() {
    return this.compile(tpl);
  }

  handleRedirect(e: Event) {
    e.preventDefault();

    const href = (e.currentTarget as HTMLElement).getAttribute('href');

    if (href) {
      const router = Router.getInstance();
      router.go(href);
    }
  }

  addEvents() {
    const link = this.element?.querySelector('a.backButton');

    link?.addEventListener('click', this.handleRedirect);
  }

  removeEvents() {
    const link = this.element?.querySelector('a.backButton');

    link?.removeEventListener('click', this.handleRedirect);
  }
}
