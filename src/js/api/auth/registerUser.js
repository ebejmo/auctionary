import { apiRequest } from '../headers/apiRequest.js';
import { API_BASE_URL, API_AUTH, API_REGISTER } from '../constants.js';

export async function registerUser(user) {
  const registerUrl = `${API_BASE_URL}${API_AUTH}${API_REGISTER}`;

  try {
    const response = await apiRequest(registerUrl, 'POST', user);
    return response;
  } catch (error) {
    return { error: error.message };
  }
}
