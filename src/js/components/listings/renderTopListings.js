import { getMediaUrl } from '../../utils/mediaUrl.js';

export function renderTopListings(topListings) {
  const container = document.getElementById('topListingsContainer');
  if (!container) {
    console.error('Error: #topListingsContainer not found in the DOM.');
    return;
  }
  container.innerHTML = '';

  const topListingsRow = document.createElement('div');
  topListingsRow.classList.add(
    'd-flex',
    'flex-nowrap',
    'overflow-auto',
    'gap-3',
  );

  topListings.forEach((listing) => {
    const card = document.createElement('a');
    card.href = `/pages/item/?id=${encodeURIComponent(listing.id)}`;
    card.classList.add(
      'card',
      'h-100',
      'text-decoration-none',
      'text-dark',
      'top-listing-card',
      'shadow-sm',
    );

    card.innerHTML = `
      <div class="image-container overflow-hidden">
        ${getMediaUrl(listing.media)}
      </div>
      <div class="card-body">
        <span class="badge bg-primary-subtle text-dark mb-2">Top Auction</span>
        <p class="card-title">${listing.title}</p>
        <p class="card-text text-muted small">
          Deadline: ${new Date(listing.endsAt).toLocaleDateString()}
        </p>
      </div>
    `;

    topListingsRow.appendChild(card);
  });

  container.appendChild(topListingsRow);
}
