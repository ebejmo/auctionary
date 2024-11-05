import { API_BASE_URL } from '../constants.js';
import { apiRequest } from '../headers/apiRequest.js';
import { showSpinner } from '../../utils/spinner.js';

export async function singleListing(listingId) {
  const spinner = document.querySelector('#spinner');
  const listingUrl = `${API_BASE_URL}/auction/listings/${encodeURIComponent(listingId)}?_seller=true&_bids=true`;

  try {
    const listing = await showSpinner(spinner, () =>
      apiRequest(listingUrl, 'GET'),
    );
    return listing;
  } catch (error) {
    console.error('Error fetching the listing', error);
    return { error: 'Failed to fetch the listing. Please try again later.' };
  }
}
