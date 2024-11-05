import { displayUserFeedback } from '../../utils/feedback.js';
import { renderListingCards } from '../listings/renderListingsCard.js';

export function renderProfileListings(profileData, listings) {
  const listingsContainer = document.querySelector('#profileListingsContainer');
  const { name } = profileData;

  listingsContainer.innerHTML = `
    <h3 class="heading-border">The ${name}'s auctions</h3>
  `;

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
