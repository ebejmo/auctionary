import { displayUserFeedback } from '../../utils/feedback.js';
import { load } from '../../storage/load.js';
import { getMediaUrl } from '../../utils/mediaUrl.js';

export function renderProfile(profileData) {
  const profileContainer = document.querySelector('#profileContainer');
  const { name, bio, avatar, credits, _count } = profileData;

  document.title = `${name} | Auctionary`;

  const loggedInUser = load('profile');
  const isOwnProfile = loggedInUser?.data?.name === name;

  if (!profileData) {
    displayUserFeedback(
      profileContainer,
      'Error fetching profile data',
      'danger',
    );
    return;
  }

  profileContainer.innerHTML = `
  <div class="container my-4 py-3 shadow-sm bg-white">
    <div class="row align-items-center text-center text-md-start">
      ${profileAvatar(avatar)}
      ${profileHeader(name, credits, _count, bio)}
    </div>
    ${isOwnProfile ? profileActions() : ''}
  </div>
`;
}

function profileHeader(name, credits, _count, bio) {
  return `
  <div class="col-12 col-md-8">
    <h2 class="fw-bold text-dark mb-1">${name}</h2>
    <p class="text-muted">Credits: <strong>${credits}</strong></p>
    <p class="fw-semibold">
      Listings: <span class="text-primary">${_count?.listings || 0}</span> | 
      Wins: <span class="text-success">${_count?.wins || 0}</span>
    </p>
    <p class="text-muted small">${bio || 'No bio available'}</p>
  </div>
`;
}

function profileAvatar(avatar) {
  return `
    <div class="col-12 col-md-4 d-flex justify-content-center mb-3 mb-md-0">
      <div class="avatar-container">
        ${getMediaUrl(avatar)}
      </div>
    </div>
  `;
}

function profileActions() {
  return `
    <div class="d-flex flex-column flex-md-row gap-3 justify-content-center mt-3">
      <button type="button" data-bs-toggle="modal" data-bs-target="#listingModal" class="btn btn-sm btn-primary">
        Create Listing
      </button>
      <button type="button" data-bs-toggle="modal" data-bs-target="#profileModal" class="btn btn-sm btn-register">
        Update Profile
      </button>
    </div>
  `;
}
