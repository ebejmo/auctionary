import { load } from '../storage/load.js';

export function toggleCtaSection() {
  const profile = load('profile');
  const guestButtons = document.getElementById('guestButtons');
  const userWelcome = document.getElementById('userWelcome');
  const userName = document.getElementById('userName');
  const profileLinkElement = document.querySelector('.profile-link');

  if (profile && profile.data) {
    userName.textContent = profile.data.name || 'User';
    userWelcome.classList.add('d-flex');
    guestButtons.classList.add('d-none');

    const profileLink = `/pages/profile/?user=${encodeURIComponent(profile.data.name)}`;
    profileLinkElement.href = profileLink;
  } else {
    guestButtons.classList.add('d-flex');
    userWelcome.classList.add('d-none');
  }
}
