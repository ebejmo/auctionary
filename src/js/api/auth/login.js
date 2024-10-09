import { apiRequest } from '../headers/apiRequest.js';
import { save } from '../../storage/save.js';
import { API_AUTH, API_BASE_URL, API_LOGIN } from '../constants.js';

export async function loginUser(email, password) {
  const loginUrl = `${API_BASE_URL}${API_AUTH}${API_LOGIN}`;

  const requestBody = {
    email,
    password,
  };

  try {
    const profile = await apiRequest(loginUrl, 'POST', requestBody);

    console.log(profile);

    save('token', profile.accessToken);
    delete profile.accessToken;
    save('profile', profile);

    const userName = profile.data.name;
    window.location.href = `../../../../pages/profile/?user=${encodeURIComponent(userName)}`;

    return profile;
  } catch (error) {
    throw new Error(error.message || 'Unexpected login error');
  }
}
