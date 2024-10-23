export function renderSearchResults(listings) {
  const searchResultsContainer = document.querySelector('#searchResults');
  searchResultsContainer.innerHTML = '';

  listings.forEach((listing) => {
    const mediaUrl =
      listing.media.length > 0
        ? listing.media[0].url
        : 'https://picsum.photos/200/300';

    const listItem = document.createElement('a');
    listItem.classList.add('list-group-item', 'list-group-item-action');
    listItem.href = `/pages/item/?id=${encodeURIComponent(listing.id)}`;

    listItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
          <div class="media me-3">
            <img src="${mediaUrl}" class="img-fluid" alt="${listing.title}" style="max-width: 100px; max-height: 100px;">
          </div>
          <div class="d-flex flex-column">
            <h5 class="mb-1">${listing.title}</h5>
            <small>Ends on: ${new Date(listing.endsAt).toLocaleString()}</small>
          </div>
        </div>
      `;

    searchResultsContainer.appendChild(listItem);
  });
}
