import { API_KEY } from '../constants.js';

export async function apiRequest(url, method = 'GET', bodyData = null) {
  try {
    //   const token = load("token");

    const headers = {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': API_KEY,
    };

    // Add the Authorization header if a token is available
    //   if (token) {
    //     headers.Authorization = `Bearer ${token}`;
    //   }

    // Set up the request options
    const options = {
      method,
      headers,
    };

    if (bodyData) {
      options.body = JSON.stringify(bodyData);
    }

    const response = await fetch(url, options);

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Error during API request:', error);
    throw error;
  }
}
