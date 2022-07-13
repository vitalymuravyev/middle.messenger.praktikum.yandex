import renderDom from './core/renderDom';
import { Auth } from './pages/auth/auth';

document.addEventListener('DOMContentLoaded', () => {
  const page = new Auth();
  renderDom('#app', page);
})