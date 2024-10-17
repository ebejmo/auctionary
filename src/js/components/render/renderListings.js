import { listingsPerPage } from '../../api/calls/listings.js';

export function renderListings(listings, page = 1) {
  const listingsContainer = document.querySelector('#listingsContainer');
  const start = (page - 1) * listingsPerPage;
  const end = page * listingsPerPage;
  const listingsToDisplay = listings.slice(start, end);

  listingsToDisplay.forEach((listing) => {
    const mediaUrl =
      listing.media.length > 0
        ? listing.media[0].url
        : 'https://picsum.photos/200/300';
    const endsAt = new Date(listing.endsAt).toLocaleString();

    const card = document.createElement('div');
    card.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4');

    card.innerHTML = `
      <div class="card h-100">
          <img src="${mediaUrl}" class="card-img-top img-fluid" alt="${listing.title}">
          <div class="card-body d-flex flex-column justify-content-between">
              <p class="card-title">${listing.title}</h5>
              <p class="card-text">Deadline: ${endsAt}</p>
              <a href="/listing/${listing.id}" class="btn btn-login-dark mt-auto">View Item</a>
          </div>
      </div>
  `;
    listingsContainer.appendChild(card);
  });

  if (end >= listings.length) {
    document.querySelector('#viewMoreButton').style.display = 'none';
  }
}
