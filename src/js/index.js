import { getAllListings } from './api/listings/listings.js';
import { getProfile } from './api/profiles/getProfile.js';
import { populateUserDropdown } from './components/profile/userDropdown.js';
import { handleLoginForm } from './components/forms/loginForm.js';
import { handleRegistrationForm } from './components/forms/registrationForm.js';
import { manageMedia } from './listeners/mediaHandler.js';
import { setupLogoutButton } from './listeners/logoutListener.js';
import { viewMoreListener } from './listeners/viewMoreListener.js';
import { renderProfile } from './components/profile/renderProfile.js';
import { handleCreateListingForm } from './components/forms/createListingForm.js';
import { renderProfileListings } from './components/profile/renderProfileListings.js';
import { handleProfileUpdate } from './components/forms/updateProfileForm.js';

function initializePage() {
  const path = location.pathname;

  initializeCommonFeatures();

  if (path === '/index.html') {
    handleRegistrationForm();
    handleLoginForm();
    getAllListings();
    viewMoreListener();
  } else if (path === '/pages/profile/') {
    initializeProfilePage();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializePage();
});

function initializeCommonFeatures() {
  populateUserDropdown();
  setupLogoutButton();
}

async function initializeProfilePage() {
  const { profile, listings } = await getProfile();
  renderProfile(profile);
  renderProfileListings(profile, listings);
  manageMedia('#mediaFields', '#addMediaButton');
  handleCreateListingForm();
  handleProfileUpdate();
}
