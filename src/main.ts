import { Router } from 'shared/services';
import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';
import ErrorPage404 from 'pages/404';
import ErrorPage500 from 'pages/500';
import MessengerPage from 'pages/chat';
import ProfilePage from 'pages/profile';
import ProfileUpdatePage from 'pages/profile_update';
import ProfilePasswordUpdatePage from 'pages/profile_password_update';

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
