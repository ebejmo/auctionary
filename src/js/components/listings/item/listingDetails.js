import { displayUserFeedback } from '../../../utils/feedback.js';
import { load } from '../../../storage/load.js';

export function renderListingDetails(listing) {
  const listingContainer = document.querySelector('#listingDetails');
  const { title, description, media, endsAt, _count, seller, tags, bids } =
    listing.data;

  document.title = `${title} | Auctionary`;

  if (listing.error) {
    displayUserFeedback(listingContainer, listing.error, 'danger');
    return;
  }

  const userProfile = load('profile');
  const isLoggedIn = Boolean(userProfile);

  const highestBid = bids.length
    ? Math.max(...bids.map((bid) => bid.amount))
    : 0;

  const mediaItems = media.length
    ? media
        .map(
          (image, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
          <img src="${image.url}" class="d-block w-100" alt="${image.alt}">
        </div>`,
        )
        .join('')
    : `<img src="https://picsum.photos/200/300" class="d-block w-100" alt="No image available">`;

  const carousel = `
      <div id="mediaCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">${mediaItems}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#mediaCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#mediaCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>`;

  const sellerName = isLoggedIn
    ? `<a href="/pages/profile/?user=${encodeURIComponent(seller.name)}" class="text-decoration-none">${seller.name}</a>`
    : `<span>${seller.name}</span>`;

  const bidSection = isLoggedIn
    ? `
      <div class="p-3 bg-light border">
        <p><strong>Highest Bid:</strong> <span id="highestBid">${highestBid}</span></p>
        <p><strong>Total Bids:</strong> ${_count?.bids || 0}</p>
        <p><strong>Deadline:</strong> ${new Date(endsAt).toLocaleString()}</p>
        <form id="bidForm" class="mt-3">
        <div id="feedbackMessageBid" class="mb-2"></div>
          <div class="mb-3">
            <label for="bidAmount" class="form-label">Your Bid</label>
            <input type="number" class="form-control" id="bidAmount" placeholder="Enter your bid" required>
          </div>
          <button type="submit" class="btn btn-primary">Place Bid</button>
        </form>
      </div>`
    : `
      <div class="alert alert-warning">
        <p>Please <a href="/index.html">log in</a> or <a href="/index.html">create an account</a> to place a bid.</p>
      </div>`;

  const tagsHtml = tags.length
    ? tags
        .map((tag) => `<span class="badge bg-secondary me-3">${tag}</span>`)
        .join('')
    : '';

  listingContainer.innerHTML = `
      <div class="container mt-4">
        <h1>${title}</h1>
        ${carousel}
        ${bidSection}
        <div class="mt-4">
          <p>${description}</p>
          <p><strong>Seller:</strong> ${sellerName}</p>
        </div>
        <div class="mt-3 mb-3">
          ${tagsHtml}
        </div>
      </div>
    `;
  return highestBid;
}
