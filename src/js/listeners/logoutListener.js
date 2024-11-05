import { logoutUser } from '../api/auth/logout.js';

export function setupLogoutButton() {
  const logoutButton = document.querySelector('#logOutBtn');

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      logoutUser();
    });
  }
}
