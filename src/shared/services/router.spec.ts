import chai from 'chai';
import { Router } from './router.ts';

describe('Router', () => {
  let routerInstance: Router;

  beforeEach(() => {
    routerInstance = Router.getInstance();
  });

  it('goes to provided path', () => {
    routerInstance.go('/login');
    routerInstance.go('/settings');
    routerInstance.go('/profile');

    chai.expect(window.location.pathname).equals('/profile');
  });

  it('moves back to the previous page', () => {
    routerInstance.go('/login');
    routerInstance.go('/settings');
    routerInstance.back();

    chai.expect(window.location.pathname).equals('/settings');
  });

  it('moves forward to next page', () => {
    routerInstance.go('/sign-up');
    routerInstance.go('/login');
    routerInstance.back();
    routerInstance.forward();

    chai.expect(window.location.pathname).equals('/login');
  });
});
