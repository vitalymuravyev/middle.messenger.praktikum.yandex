import { Auth } from './pages/auth';
import { Router } from './core/router/Router';
import { Singup } from './pages/singup';
import { Error, ErrorPage } from './pages/error/error';
import Profile from './pages/profile';
import { Chat } from './pages/chat';

// const err404: ErrorPage = {
//   number: 404,
//   text: 'Не туда попали',
//   link_text: 'Назад к чатам',
// };
//
// const err500: ErrorPage = {
//   number: 500,
//   text: 'Мы уже фиксим',
//   link_text: 'Назад в будущее',
// };

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router('#app');

  router.use('/', Auth)
    .use('/sign-up', Singup)
    .use('/messenger', Chat)
    .use('/settings', Profile)
    .use('/error', Error)
    .use('', Error)
    .start();
});
