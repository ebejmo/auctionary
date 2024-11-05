import { listingsPerPage } from '../../api/listings/listings.js';
import { displayUserFeedback } from '../../utils/feedback.js';
import { renderListingCards } from './renderListingsCard.js';

export function renderListings(listings, page = 1, append = false) {
  const listingsContainer = document.querySelector('#listingsContainer');
  const viewMoreButton = document.querySelector('#viewMoreButton');

  !append && (listingsContainer.innerHTML = '');

  if (!listings.length) {
    displayUserFeedback(
      listingsContainer,
      'There are no listings to display.',
      'info',
    );
    viewMoreButton && (viewMoreButton.style.display = 'none');
    return;
  }

  const start = (page - 1) * listingsPerPage;
  const end = Math.min(start + listingsPerPage, listings.length);

  renderListingCards(listings.slice(start, end), listingsContainer);

  viewMoreButton &&
    (viewMoreButton.style.display =
      end >= listings.length ? 'none' : 'inline-block');
}
