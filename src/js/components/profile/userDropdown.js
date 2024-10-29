import { load } from '../../storage/load.js';

export function populateUserDropdown() {
  const profile = load('profile');
  const userData = profile?.data;
  const userDropdown = document.querySelector('#userDropdown');
  const userAvatar = document.querySelector('#userAvatar');
  const defaultAvatar = '/assests/img/avatar_placeholder.png';

  if (!userData || !userDropdown || !userAvatar) {
    if (userDropdown) {
      userDropdown.style.display = 'none';
    }
    return;
  }

  userDropdown.style.display = 'block';
  setUserAvatar(userAvatar, userData.avatar, defaultAvatar);
  setProfileLink(userDropdown, userData);
}

function setUserAvatar(avatarElement, avatarData, defaultAvatar) {
  avatarElement.src = avatarData?.url || defaultAvatar;
  avatarElement.alt = avatarData?.alt || 'User Avatar';
}

function setProfileLink(userDropdown, userData) {
  const profileLink = `/pages/profile/?user=${encodeURIComponent(userData.name)}`;
  const profileDropdownItem = userDropdown.querySelector('#profileLink');

  if (profileDropdownItem) {
    profileDropdownItem.href = profileLink;
  }
}
