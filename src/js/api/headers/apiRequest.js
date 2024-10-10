import { load } from '../../storage/load.js';
import { API_KEY } from '../constants.js';

export async function apiRequest(url, method = 'GET', bodyData = null) {
  try {
    const token = load('token');

    const headers = {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': API_KEY,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
    };

    if (bodyData) {
      options.body = JSON.stringify(bodyData);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.errors?.[0]?.message ||
        `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.log('Error during API request:', error);
    throw error;
  }
}
