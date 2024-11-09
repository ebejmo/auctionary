import { displayUserFeedback } from '../../../utils/feedback.js';
import { load } from '../../../storage/load.js';
import { getMediaUrl } from '../../../utils/mediaUrl.js';

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

  const carousel = createCarousel(media);

  const sellerName = isLoggedIn
    ? `<a href="/pages/profile/?user=${encodeURIComponent(seller.name)}" class="text-decoration-underline">${seller.name}</a>`
    : `<span>${seller.name}</span>`;

  const bidSection = createBidSection(
    isLoggedIn,
    highestBid,
    _count.bids,
    endsAt,
  );

  const tagsHtml = tags.length
    ? tags
        .map(
          (tag) =>
            `<span class="badge bg-primary-subtle text-dark me-2">${tag}</span>`,
        )
        .join('')
    : '';

  listingContainer.innerHTML = `
    <div class="container my-4">
      <div class="card shadow-sm p-4 listing-details-card">
        <h1 class="mb-3">${title}</h1>
        ${carousel}
        ${bidSection}
        <div class="mt-4">
          <p class="text-muted">${description}</p>
          <p class="text-muted">Seller: ${sellerName}</p>
        </div>
        <div class="mt-3 mb-3">${tagsHtml}</div>
      </div>
    </div>
  `;
}

function createCarousel(media) {
  const mediaItems = media.length
    ? media
        .map(
          (image, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
          ${getMediaUrl([image])}
        </div>`,
        )
        .join('')
    : `<div class="carousel-item active">
         <img src="https://picsum.photos/1000/1000" class="d-block w-100 h-100" alt="No image available">
       </div>`;
  return `
    <div id="mediaCarousel" class="carousel slide mb-3" data-bs-ride="carousel">
      <div class="carousel-inner">${mediaItems}</div>
      <button class="carousel-control-prev" type="button" data-bs-target="#mediaCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#mediaCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
}

function createBidSection(isLoggedIn, highestBid, totalBids, endsAt) {
  return isLoggedIn
    ? `
      <div class="card shadow-sm mt-3 bid-card bg-light-subtle">
        <div class="card-header d-flex align-items-center justify-content-between text-muted">
          <span><i class="bi bi-info-square me-2"></i></i>Auction Details</span>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="bid-label">Highest Bid</span>
            <span id="highestBid" class="bid-value text-success">${highestBid}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="bid-label">Total Bids</span>
            <span class="bid-value">${totalBids}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="bid-label">Deadline</span>
            <span id="deadlineDate" class="bid-value text-danger">${new Date(endsAt).toLocaleString()}</span>
          </div>
          <form id="bidForm" class="mt-3">
            <div id="feedbackMessageBid" class="mb-2"></div>
            <div class="mb-3">
              <label for="bidAmount" class="form-label">Your Bid</label>
              <input type="number" class="form-control" id="bidAmount" placeholder="Enter your bid" required>
            </div>
            <div class="d-flex justify-content-end">
              <button type="submit" class="btn btn-register">Place Bid</button>
            </div>
          </form>
        </div>
      </div>`
    : `
      <div class="alert alert-warning mt-3">
        <p>Please <a href="/index.html">log in</a> or <a href="/index.html">create an account</a> to place a bid.</p>
      </div>
    `;
}
