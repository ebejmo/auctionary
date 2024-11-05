import { load } from '../../storage/load.js';
import { showSpinner } from '../../utils/spinner.js';
import { API_BASE_URL } from '../constants.js';
import { apiRequest } from '../headers/apiRequest.js';

export async function getProfile(userName = null) {
  const spinner = document.querySelector('#spinner');
  const storedProfile = load('profile');

  const profileName = userName || storedProfile?.data?.name;

  if (!profileName) {
    console.error('No user profile found in storage or provided');
    return { profile: null, listings: [] };
  }

  const profileUrl = `${API_BASE_URL}/auction/profiles/${encodeURIComponent(profileName)}?_listings=true&_wins=true`;

  try {
    const profileResponse = await showSpinner(spinner, () =>
      apiRequest(profileUrl, 'GET'),
    );
    const profile = profileResponse.data || {};
    const listings = profile.listings || [];

    return { profile, listings };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return { profile: null, listings: [] };
  }
}
