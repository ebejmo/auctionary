import { displayUserFeedback } from '../../utils/feedback.js';
import { renderListingCards } from '../listings/renderListingsCard.js';

export function renderProfileListings(profileData, listings) {
  const listingsContainer = document.querySelector('#profileListingsContainer');
  const { name } = profileData;

  listingsContainer.innerHTML = `
  <div class="col-12">
    <h2 class="heading-border">${name}'s auctions</h2>
  </div>  
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
