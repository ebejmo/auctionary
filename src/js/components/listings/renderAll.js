import { displayUserFeedback } from '../../utils/feedback.js';
import { renderListingCards } from './renderListingsCard.js';

export function renderAllListings(listings) {
  const listingsContainer = document.querySelector('#listingsContainer');
  listingsContainer.innerHTML = '';

  if (!listings.length) {
    displayUserFeedback(
      listingsContainer,
      'There are no listings to display.',
      'info',
    );
    return;
  }

  renderListingCards(listings, listingsContainer);
}
