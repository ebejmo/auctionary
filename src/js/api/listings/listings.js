import { renderListings } from '../../components/listings/renderListings.js';
import { showSpinner } from '../../utils/spinner.js';
import { API_BASE_URL, LISTINGS } from '../constants.js';
import { apiRequest } from '../headers/apiRequest.js';

export let listingsPerPage = 12;
export let allListings = [];

export async function getAllListings() {
  const listingsUrl = `${API_BASE_URL}${LISTINGS}`;
  const spinner = document.querySelector('#spinner');

  try {
    const response = await showSpinner(spinner, () =>
      apiRequest(listingsUrl, 'GET'),
    );
    allListings = response.data;
    renderListings(allListings, 1);
    return allListings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}
