import { displayUserFeedback } from '../../utils/feedback.js';

export function renderProfile(profileData) {
  const profileContainer = document.querySelector('#profileContainer');

  if (!profileData) {
    displayUserFeedback(
      profileContainer,
      'Error fetching profile data',
      'danger',
    );
    return;
  }

  const { name, email, avatar, bio } = profileData.data;

  profileContainer.innerHTML = `
        <img src="${avatar?.url || 'https://via.placeholder.com/150'}" alt="${avatar?.alt || 'User Avatar'}" class="rounded-circle">
        <h2>${name}</h2>
        <p>Email: ${email}</p>
        <p>Bio: ${bio}</p>`;
}
