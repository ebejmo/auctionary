import { renderListings } from '../../components/listings/renderListings.js';
import { showSpinner } from '../../utils/spinner.js';
import { API_BASE_URL, LISTINGS } from '../constants.js';
import { apiRequest } from '../headers/apiRequest.js';

export let listingsPerPage = 12;
export let allListings = [];

export async function getAllListings() {
  const listingsUrl = `${API_BASE_URL}${LISTINGS}?_active=true&_bids=true`;
  const spinner = document.querySelector('#spinner');

  try {
    const response = await showSpinner(spinner, () =>
      apiRequest(listingsUrl, 'GET'),
    );
    allListings = response.data;

    const sortedListings = [...allListings].sort(
      (a, b) => b._count.bids - a._count.bids,
    );

    const topListings = sortedListings.slice(0, 12);
    const remainingListings = sortedListings.slice(12);
    renderTopListings(topListings);
    // console.log('TOPLISTINGS:', topListings);

    renderListings(remainingListings, 1);
    // console.log(allListings);
    return allListings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}

function renderTopListings(topListings) {
  const container = document.getElementById('topListingsContainer');
  container.innerHTML = ''; // Clear any existing content

  topListings.forEach((listing) => {
    const mediaUrl = listing.media[0]?.url || 'https://picsum.photos/200/300';
    const card = document.createElement('a');
    card.href = `/pages/item/?id=${encodeURIComponent(listing.id)}`;
    card.classList.add(
      'card',
      'h-100',
      'text-decoration-none',
      'text-dark',
      'me-3',
      'top-listing-card',
    ); // Adjusted for top listings

    card.innerHTML = `
      <div class="image-container d-flex align-items-center justify-content-center overflow-hidden">
        <img src="${mediaUrl}" class="img-fluid" alt="${listing.title}">
      </div>
      <div class="card-body d-flex flex-column justify-content-between">
        <span class="badge bg-warning text-dark mb-2">Top Auction</span>
        <p class="card-title">${listing.title}</p>
        <p class="card-text text-muted">Deadline: ${listing.endsAt}</p>
      </div>
    `;

    container.appendChild(card);
  });

  // Scrolling functionality for left and right arrows
  document.getElementById('leftArrow').addEventListener('click', () => {
    container.scrollBy({ left: -300, behavior: 'smooth' });
  });
  document.getElementById('rightArrow').addEventListener('click', () => {
    container.scrollBy({ left: 300, behavior: 'smooth' });
  });
}
