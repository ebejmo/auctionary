import { load } from '../../storage/load.js';

export function populateUserDropdown() {
  const profile = load('profile');
  const userData = profile?.data;
  const userDropdown = document.querySelector('#userDropdown');
  const userAvatar = document.querySelector('#userAvatar');
  const defaultAvatar = 'https://via.placeholder.com/32';

  if (!userData || !userDropdown || !userAvatar) {
    if (userDropdown) {
      userDropdown.style.display = 'none';
    }
    return;
  }

  userDropdown.style.display = 'flex';

  setUserAvatar(userAvatar, userData.avatar, defaultAvatar);
  setProfileLink(userDropdown, userData);
}

function setUserAvatar(avatarElement, avatarData, defaultAvatar) {
  avatarElement.src = avatarData?.url || defaultAvatar;
  avatarElement.alt = avatarData?.alt || 'User Avatar';
}

function setProfileLink(userDropdown, userData) {
  const profileLink = `/pages/profile/?user=${userData.name}`;
  const profileDropdownItem = userDropdown.querySelector('#profileLink');

  if (profileDropdownItem) {
    profileDropdownItem.href = profileLink;
  }
}
