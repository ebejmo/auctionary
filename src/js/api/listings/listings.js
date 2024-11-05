// import { renderListings } from '../../components/listings/renderListings.js';
// import { renderTopListings } from '../../components/listings/renderTopListings.js';
// import { showSpinner } from '../../utils/spinner.js';
// import { API_BASE_URL, LISTINGS } from '../constants.js';
// import { apiRequest } from '../headers/apiRequest.js';

// export let listingsPerPage = 12;
// export let allListings = [];

// export async function getAllListings() {
//   const listingsUrl = `${API_BASE_URL}${LISTINGS}?_active=true&_bids=true`;
//   const spinner = document.querySelector('#spinner');

//   try {
//     const response = await showSpinner(spinner, () =>
//       apiRequest(listingsUrl, 'GET'),
//     );
//     allListings = response.data;

//     const sortedListings = [...allListings].sort(
//       (a, b) => b._count.bids - a._count.bids,
//     );
//     const topListings = sortedListings.slice(0, 12);
//     const remainingListings = sortedListings.slice(12);

//     renderTopListings(topListings);
//     renderListings(remainingListings, 1);

//     return allListings;
//   } catch (error) {
//     console.error('Error fetching listings:', error);
//     throw error;
//   }
// }

import { renderListings } from '../../components/listings/renderListings.js';
import { renderTopListings } from '../../components/listings/renderTopListings.js';
import { showSpinner } from '../../utils/spinner.js';
import { API_BASE_URL, LISTINGS } from '../constants.js';
import { apiRequest } from '../headers/apiRequest.js';

export let listingsPerPage = 12;
export let allListings = [];

export async function getAllListings() {
  const listingsUrl = `${API_BASE_URL}${LISTINGS}?_active=true&_bids=true`;
  const spinner = document.querySelector('#spinner');
  const topListingsContainer = document.querySelector('#topListingsContainer');
  const listingsContainer = document.querySelector('#listingsContainer');

  // Show spinner and clear any previous listings content
  spinner.style.display = 'block';
  topListingsContainer.innerHTML = '';
  listingsContainer.innerHTML = '';

  try {
    // Fetch listings
    const response = await showSpinner(spinner, () =>
      apiRequest(listingsUrl, 'GET'),
    );
    allListings = response.data;

    // Sort and slice listings for top and regular sections
    const sortedListings = [...allListings].sort(
      (a, b) => b._count.bids - a._count.bids,
    );
    const topListings = sortedListings.slice(0, 12);
    const remainingListings = sortedListings.slice(12);

    // Render top listings and regular listings
    renderTopListings(topListings);
    renderListings(remainingListings, 1);

    // Hide spinner after rendering
    spinner.style.display = 'none';

    return allListings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}
