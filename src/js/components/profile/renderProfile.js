import { displayUserFeedback } from '../../utils/feedback.js';

export function renderProfile(profileData) {
  const profileContainer = document.querySelector('#profileContainer');
  const { name, bio, avatar, credits, _count } = profileData;

  document.title = `${name} | Auctionary`;

  if (!profileData) {
    displayUserFeedback(
      profileContainer,
      'Error fetching profile data',
      'danger',
    );
    return;
  }

  profileContainer.innerHTML = `
    <div class="container mt-4">

      <div class="row align-items-center mb-4">

        <div class="col-7 text-start">
          <h2 class="fw-bold mb-1">${name}</h2>
          <p class="text-muted mb-2">Credits: <strong>${credits}</strong></p>
          <p class="fw-bold">Total Listings: <span class="text-muted">${_count?.listings || 0}</span></p>
          <p class="fw-bold">Total Wins: <span class="text-muted">${_count?.wins || 0}</span></p>
          <div class="">
            <p class="text-muted">${bio || 'No bio available'}</p>
          </div>
       </div>

        <div class="col-5 text-end">
            <div class="avatar-container">
              <img src="${avatar?.url || 'https://via.placeholder.com/150'}" alt="${avatar?.alt || 'User Avatar'}" class="profile-avatar img-fluid rounded-circle">
            </div>   
        </div>
        </div>

        <div class="row mb-4">
          <div class="col-12 d-flex flex-column flex-sm-row justify-content-sm-between align-items-center">
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#listingModal"
              class="btn btn-primary w-auto mb-2 mb-sm-0">
              Create Listing
            </button>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#profileModal"
              class="btn btn-outline-dark w-auto mb-2 mb-sm-0">
              Update Profile
            </button>
          </div>
        </div>
    </div>
    `;
}
