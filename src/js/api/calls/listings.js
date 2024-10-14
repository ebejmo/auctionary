import { renderListings } from '../../components/render/renderListings.js';
import { LISTINGS, API_BASE_URL } from '../constants.js';
import { apiRequest } from '../headers/apiRequest.js';

export let listingsPerPage = 12;
// export let currentPage = 1;
export let allListings = [];

export async function getAllListings() {
  const listingsUrl = `${API_BASE_URL}${LISTINGS}`;

  try {
    const response = await apiRequest(listingsUrl, 'GET');
    allListings = response.data;
    renderListings(allListings, 1);
    console.log(allListings);
    return allListings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}
