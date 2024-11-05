import { getAllListings } from './api/listings/listings.js';
import { getProfile } from './api/profiles/getProfile.js';
import { populateUserDropdown } from './components/profile/userDropdown.js';
import { handleLoginForm } from './components/forms/loginForm.js';
import { handleRegistrationForm } from './components/forms/registrationForm.js';
import { setupLogoutButton } from './listeners/logoutListener.js';
import { viewMoreListener } from './listeners/viewMoreListener.js';
import { renderProfile } from './components/profile/renderProfile.js';
import { renderProfileListings } from './components/profile/renderProfileListings.js';
import { getQueryParam } from './utils/queryParam.js';
import { renderListingDetails } from './components/listings/item/listingDetails.js';
import { singleListing } from './api/listings/getSingleListing.js';
import { bidListener } from './listeners/placeBidListener.js';
import { searchListener } from './listeners/searchListener.js';
import { toggleCtaSection } from './utils/ctaSection.js';
import { load } from './storage/load.js';
import { setupProfileEditing } from './components/profile/profileEdit.js';

function initializeCommonFeatures() {
  populateUserDropdown();
  setupLogoutButton();
  searchListener();
}

function initializeHomePage() {
  handleRegistrationForm();
  handleLoginForm();
  toggleCtaSection();
  getAllListings();
  viewMoreListener();
}

async function initializeProfilePage() {
  try {
    const userName = getQueryParam('user');
    const loggedInUserName = load('profile')?.data?.name;
    const isOwnProfile = userName === loggedInUserName || !userName;

    const { profile, listings } = await getProfile(userName);
    renderProfile(profile, isOwnProfile);
    renderProfileListings(profile, listings);

    if (isOwnProfile) {
      setupProfileEditing();
    }
  } catch (error) {
    console.error('Failed to load profile page:', error);
  }
}

async function initializeItemPage() {
  try {
    const listingId = getQueryParam('id');
    const listingData = await singleListing(listingId);
    renderListingDetails(listingData, load('profile'));
    bidListener(listingId);
  } catch (error) {
    console.error('Failed to load item page:', error);
  }
}

function initializePage() {
  initializeCommonFeatures();

  const path = location.pathname;
  if (path === '/' || path === '/index.html') {
    initializeHomePage();
  } else if (path.includes('/profile')) {
    initializeProfilePage();
  } else if (path.includes('/item')) {
    initializeItemPage();
  }
}

document.addEventListener('DOMContentLoaded', initializePage);
