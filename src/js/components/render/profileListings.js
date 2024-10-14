export function renderProfileListings(profileData, listings) {
  const listingsContainer = document.querySelector('#profileListingsContainer');
  const { name } = profileData;

  listingsContainer.innerHTML = `
        <h3 class="heading-border">The ${name}'s auctions</h3>
    `;

  if (!listings || listings.length === 0) {
    listingsContainer.innerHTML +=
      '<p class="text-muted>There are no listings to display at the moment.</p>';
    return;
  }

  listings.forEach((listing) => {
    const mediaUrl =
      listing.media.length > 0
        ? listing.media[0].url
        : 'https://picsum.photos/200/300';
    const endsAt = new Date(listing.endsAt).toLocaleString();

    const listingItem = document.createElement('div');
    listingItem.classList.add('profile-listing-item', 'mb-3');

    listingItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5>${listing.title}</h5>
                    <p>Deadline: ${endsAt}</p>
                </div>
                <div class="profile-listing-image">
                    <img src="${mediaUrl}" alt="${listing.title}" class="img-fluid rounded">
                </div>
            </div>
            <a href="/listing/${listing.id}" class="btn btn-primary mt-2">View Item</a>
        `;
    listingsContainer.appendChild(listingItem);
  });
}
