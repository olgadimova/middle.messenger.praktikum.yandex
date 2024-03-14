import { Router } from 'shared/services';
import LoginPage from 'modules/login';
import RegisterPage from 'modules/register';
import ErrorPage404 from 'modules/404';
import ErrorPage500 from 'modules/500';
import MessengerPage from 'modules/chat';
import ProfilePage from 'modules/profile';
import ProfileUpdatePage from 'modules/profile_update';
import ProfilePasswordUpdatePage from 'modules/profile_password_update';

const router = new Router('#app');

router
  .use('/', LoginPage)
  .use('/sign-up', RegisterPage)
  .use('/404', ErrorPage404)
  .use('/500', ErrorPage500)
  .use('/messenger', MessengerPage)
  .use('/profile', ProfilePage)
  .use('/settings', ProfileUpdatePage)
  .use('/settings-password', ProfilePasswordUpdatePage)
  .start();
