import { renderListings } from '../../components/render/renderListings.js';
import { ALL_LISTINGS, API_BASE_URL } from '../constants.js';
import { apiRequest } from '../headers/apiRequest.js';

export async function getAllListings() {
  const listingsUrl = `${API_BASE_URL}${ALL_LISTINGS}`;

  try {
    const response = await apiRequest(listingsUrl, 'GET');
    const listings = response.data;
    console.log(listings);
    renderListings(listings);
    return listings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}
