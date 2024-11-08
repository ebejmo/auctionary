import { renderAllListings } from '../../components/listings/renderAll.js';
import { renderListings } from '../../components/listings/renderListings.js';
import { renderTopListings } from '../../components/listings/renderTopListings.js';
import { showSpinner } from '../../utils/spinner.js';
import { API_BASE_URL, LISTINGS } from '../constants.js';
import { apiRequest } from '../headers/apiRequest.js';

export let listingsPerPage = 12;
export let allListings = [];

export async function getAllListings(showTopListings = false) {
  const listingsUrl = `${API_BASE_URL}${LISTINGS}?_active=true&_bids=true`;
  const spinner = document.querySelector('#spinner');
  const topListingsContainer = document.querySelector('#topListingsContainer');
  const listingsContainer = document.querySelector('#listingsContainer');

  spinner.style.display = 'block';
  listingsContainer.innerHTML = '';
  if (showTopListings && topListingsContainer) {
    topListingsContainer.innerHTML = '';
  }

  try {
    const response = await showSpinner(spinner, () =>
      apiRequest(listingsUrl, 'GET'),
    );
    allListings = response.data;

    const sortedListings = [...allListings].sort(
      (a, b) => b._count.bids - a._count.bids,
    );

    if (showTopListings) {
      const topListings = sortedListings.slice(0, 12);
      const remainingListings = sortedListings.slice(12);
      renderTopListings(topListings);
      renderListings(remainingListings);
    } else {
      renderAllListings(sortedListings);
    }

    spinner.style.display = 'none';

    return allListings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}
