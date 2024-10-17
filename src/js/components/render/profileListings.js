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
    <div class="listing-item mb-3">
        <div class="row g-0">
            <div class="col-4 col-md-2"> 
                <img src="${mediaUrl}" class="listing-image img-fluid" alt="${listing.title}">
            </div>
            <div class="col-8">
                <div class="listing-content p-3">
                    <h5 class="listing-title">${listing.title}</h5>
                    <p class="listing-author">${name}</p>
                    <p class="listing-deadline"><strong>Deadline:</strong> ${endsAt}</p>
                    <a href="/pages/item/${listing.id}" class="col-md-2 btn btn-outline-dark listing-btn w-100">View Item</a>   
                </div>
            </div>
        </div>
    </div>
`;
    listingsContainer.appendChild(listingItem);
  });
}
