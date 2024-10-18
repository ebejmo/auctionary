import { API_BASE_URL, LISTINGS } from '../constants.js';
import { apiRequest } from '../headers/apiRequest.js';

export async function createListing(listing) {
  const listingUrl = `${API_BASE_URL}${LISTINGS}`;

  try {
    const response = await apiRequest(listingUrl, 'POST', listing);
    return response;
  } catch (error) {
    console.error('Error creating listings:', error);
    throw error;
  }
}
