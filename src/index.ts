import { Auth } from './pages/auth';
import { Router } from './core/router/Router';
import { Singup } from './pages/singup';
import { Error, ErrorPage } from './pages/error/error';
import { Profile } from './pages/profile';
import { mockUser } from './mock/user';
import { Chat } from './pages/chat';

const err404: ErrorPage = {
  number: 404,
  text: 'Не туда попали',
  link_text: 'Назад к чатам',
};

const err500: ErrorPage = {
  number: 500,
  text: 'Мы уже фиксим',
  link_text: 'Назад в будущее',
};

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router('#app');

  router.use('/', new Auth())
    .use('/sign-up', new Singup())
    .use('/messenger', new Chat())
    .use('/settings', new Profile({ user: mockUser }))
    .use('/error', new Error(err500))
    .use('', new Error(err404))
    .start();
});
