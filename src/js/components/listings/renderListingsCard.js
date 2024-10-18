import { createListingCard } from './createListingCard.js';

export function renderListingCards(listings, container) {
  listings.forEach((listing) => {
    const card = createListingCard(listing);
    container.appendChild(card);
  });
}
