import { load } from '../../storage/load.js';
import { API_BASE_URL } from '../constants.js';
import { apiRequest } from '../headers/apiRequest.js';

export async function updateProfile(profileData) {
  const storedProfile = load('profile');
  const profileName = storedProfile.data.name;
  const profileUrl = `${API_BASE_URL}/auction/profiles/${encodeURIComponent(profileName)}`;

  try {
    const response = await apiRequest(profileUrl, 'PUT', profileData);
    return response;
  } catch (error) {
    return { error: error.message };
  }
}
