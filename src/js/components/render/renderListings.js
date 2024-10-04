export function renderListings(listings) {
  const listingsContainer = document.querySelector('#listingsContainer');

  listings.forEach((listing) => {
    const mediaUrl =
      listing.media.length > 0
        ? listing.media[0].url
        : '../../../../assests/img/hero-img.jpg';
    const endsAt = new Date(listing.endsAt).toLocaleString();

    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');

    card.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${mediaUrl}" class="img-fluid rounded-start" alt="${listing.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${listing.title}</h5>
              <p class="card-text">Ends At: ${endsAt}</p>
              <a href="/listing/${listing.id}" class="btn btn-primary">View Item</a>
            </div>
          </div>
        </div>
      `;

    listingsContainer.appendChild(card);
  });
}
