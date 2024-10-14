import { getAllListings } from './api/calls/listings.js';
import { getProfile } from './api/profile/getProfile.js';
import { populateUserDropdown } from './components/dropdown/userDropdown.js';
import { handleLoginForm } from './components/forms/loginForm.js';
import { handleRegistrationForm } from './components/forms/registrationForm.js';
import { manageMedia } from './components/listeners/mediaHandler.js';
import { setupLogoutButton } from './components/listeners/logout.js';
import { viewMoreListener } from './components/listeners/viewMore.js';
import { renderProfile } from './components/render/renderProfile.js';
import { handleCreateListingForm } from './components/forms/createListingForm.js';
import { renderProfileListings } from './components/render/profileListings.js';

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
    console.log('hello');
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
  try {
    const { profile, listings } = await getProfile();

    if (!profile) {
      throw new Error('Profile data is undefined');
    }

    renderProfile(profile);
    renderProfileListings(profile, listings);

    manageMedia('#mediaFields', '#addMediaButton');
    handleCreateListingForm();
  } catch (error) {
    console.error('Error initializing profile page:', error);
  }
}
