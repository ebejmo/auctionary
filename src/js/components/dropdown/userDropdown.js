import { load } from '../../storage/load.js';

export function populateUserDropdown() {
  const userDropdown = document.querySelector('#userDropdown');
  const userAvatar = document.querySelector('#userAvatar');
  const defaultAvatar = 'https://via.placeholder.com/32';

  const profile = load('profile');
  const userData = profile?.data;

  if (userData && userDropdown && userAvatar) {
    userDropdown.style.display = 'flex';

    userAvatar.src = userData.avatar?.url || defaultAvatar;
    userAvatar.alt = userData.avatar?.alt || 'User Avatar';
  } else {
    userDropdown.style.display = 'none';
  }
}
