import { displayUserFeedback } from '../../utils/feedback.js';
import { load } from '../../storage/load.js';

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

// Profile header
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

// Profile avatar
function profileAvatar(avatar) {
  return `
    <div class="col-12 col-md-4 d-flex justify-content-center mb-3 mb-md-0">
      <div class="avatar-container">
        <img src="${avatar?.url || '/assets/img/avatar_placeholder.png'}" alt="${avatar?.alt || 'User Avatar'}" class="profile-avatar">
      </div>
    </div>
  `;
}

// Action buttons
// function profileActions() {
//   return `
//   <div class="d-flex flex-column flex-md-row gap-3 justify-content-center mt-3">
//     <button type="button" data-bs-toggle="modal" data-bs-target="#listingModal" class="btn btn-sm btn-primary">
//       Create Listing
//     </button>
//     <button type="button" data-bs-toggle="modal" data-bs-target="#profileModal" class="btn btn-sm btn-register">
//       Update Profile
//     </button>
//   </div>
// `;

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

// profileContainer.innerHTML = `
//   <div class="container mt-4">

//     <div class="row align-items-center mb-4">

//       <div class="col-7 text-start">
//         <h2 class="fw-bold mb-1">${name}</h2>
//         <p class="text-muted mb-2">Credits: <strong>${credits}</strong></p>
//         <p class="fw-bold">Total Listings: <span class="text-muted">${_count?.listings || 0}</span></p>
//         <p class="fw-bold">Total Wins: <span class="text-muted">${_count?.wins || 0}</span></p>
//         <div class="">
//           <p class="text-muted">${bio || 'No bio available'}</p>
//         </div>
//      </div>

//       <div class="col-5 text-end">
//           <div class="avatar-container">
//             <img src="${avatar?.url || '/assests/img/avatar_placeholder.png'}" alt="${avatar?.alt || 'User Avatar'}" class="profile-avatar img-fluid rounded-circle">
//           </div>
//       </div>
//       </div>

//       <div class="row mb-4">
//         <div class="col-12 d-flex flex-column flex-sm-row justify-content-sm-between align-items-center">
//           <button
//             type="button"
//             data-bs-toggle="modal"
//             data-bs-target="#listingModal"
//             class="btn btn-sm btn-primary w-auto mb-2 mb-sm-0">
//             Create Listing
//           </button>
//           <button
//             type="button"
//             data-bs-toggle="modal"
//             data-bs-target="#profileModal"
//             class="btn btn-sm btn-outline-dark w-auto mb-2 mb-sm-0">
//             Update Profile
//           </button>
//         </div>
//       </div>
//   </div>
//   `;

//   profileContainer.innerHTML = `
//     <div class="container my-4 p-4 rounded shadow-sm profile-container">
//       <div class="row align-items-center text-center text-md-start">
//         <!-- Avatar Section -->
//         <div class="col-12 col-md-4 d-flex justify-content-center mb-3 mb-md-0">
//           <div class="avatar-container">
//             <img src="${avatar?.url || '/assets/img/avatar_placeholder.png'}" alt="${avatar?.alt || 'User Avatar'}" class="profile-avatar img-fluid rounded-circle">
//           </div>
//         </div>

//         <!-- Profile Info Section -->
//         <div class="col-12 col-md-8">
//           <h2 class="fw-bold mb-1">${name}</h2>
//           <p class="text-muted">Credits: <strong>${credits}</strong></p>
//           <p class="fw-semibold">Listings: <span class="text-primary">${_count?.listings || 0}</span> | Wins: <span class="text-success">${_count?.wins || 0}</span></p>
//           <p class="text-muted small">${bio || 'No bio available'}</p>
//         </div>
//       </div>

//       <!-- Action Buttons Section -->
//       <div class="d-flex flex-column flex-md-row gap-3 justify-content-center mt-3">
//         <button type="button" data-bs-toggle="modal" data-bs-target="#listingModal" class="btn btn-primary btn-sm px-4">
//           Create Listing
//         </button>
//         <button type="button" data-bs-toggle="modal" data-bs-target="#profileModal" class="btn btn-outline-dark btn-sm px-4">
//           Update Profile
//         </button>
//       </div>
//     </div>
//   `;
// }
