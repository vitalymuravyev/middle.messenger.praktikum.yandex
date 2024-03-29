import { Auth } from './pages/auth';
import { Router } from './core/router/Router';
import { Singup } from './pages/singup';
import { Error } from './pages/error/error';
import Profile from './pages/profile';
import Chat from './pages/chat';
import ChangeSettings from './pages/profile/changeSettings';
import { ChangePassword } from './pages/profile/changePassword';
import { ChangeAvatar } from './pages/profile/changeAvatar';

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router('#app');

  router.use('/', Auth)
    .use('/sign-up', Singup)
    .use('/messenger', Chat)
    .use('/settings', Profile)
    .use('/error', Error)
    .use('/settings/change-settings', ChangeSettings)
    .use('/settings/change-password', ChangePassword)
    .use('/settings/change-avatar', ChangeAvatar)
    .use('*', Error)
    .start();
});
