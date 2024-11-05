import { getMediaUrl } from '../../utils/mediaUrl.js';

export function createListingCard(listing) {
  const endsAt = new Date(listing.endsAt).toLocaleString();

  const card = document.createElement('div');
  card.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4', 'listing-card');

  card.innerHTML = `
    <a href="/pages/item/?id=${encodeURIComponent(listing.id)}" class="card h-100 text-decoration-none shadow-sm text-dark">
      <div class="image-container d-flex align-items-center justify-content-center overflow-hidden">
        ${getMediaUrl(listing.media)}
      </div>
      <div class="card-body d-flex flex-column justify-content-between">
        <p class="card-title">${listing.title}</p>
        <p class="card-text text-muted">Deadline: ${endsAt}</p>
        <span class="btn btn-sm btn-login-dark align-self-start">View Item</span>
      </div>
    </a>
  `;

  return card;
}
