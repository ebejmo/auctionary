import { remove } from '../../storage/remove.js';

export function logoutUser() {
  remove('token');
  remove('profile');

  window.location.href = '/index.html';
}
