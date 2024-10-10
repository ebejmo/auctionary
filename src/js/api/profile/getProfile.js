import { load } from '../../storage/load.js';
import { showSpinner } from '../../utils/spinner.js';
import { API_BASE_URL } from '../constants.js';
import { apiRequest } from '../headers/apiRequest.js';

export async function getProfile() {
  const spinner = document.querySelector('#spinner');
  const storedProfile = load('profile');

  if (!storedProfile || !storedProfile.data.name) {
    console.error('No user profile found in storage');
    return;
  }

  const userName = storedProfile.data.name;
  const profileUrl = `${API_BASE_URL}/auction/profiles/${encodeURIComponent(userName)}`;

  try {
    const profileResponse = await showSpinner(spinner, () =>
      apiRequest(profileUrl, 'GET'),
    );
    console.log('Full Profile Data', profileResponse);
    return profileResponse;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
}
