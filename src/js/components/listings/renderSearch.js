import { getMediaUrl } from '../../utils/mediaUrl.js';

export function renderSearchResults(listings) {
  const searchResultsContainer = document.querySelector('#searchResults');
  searchResultsContainer.style.display = 'block';
  searchResultsContainer.innerHTML = '';

  const resultsCard = document.createElement('div');
  resultsCard.classList.add('card', 'shadow-sm', 'search-results-card');

  resultsCard.innerHTML = `
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="mb-0">Search Results</h5>
      <button type="button" class="btn-close" aria-label="Close" onclick="document.querySelector('#searchResults').innerHTML = '';"></button>
    </div>
    <ul class="list-group list-group-flush" id="resultsList"></ul>
  `;

  const resultsList = resultsCard.querySelector('#resultsList');

  listings.forEach((listing) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'p-2');

    listItem.innerHTML = `
      <a href="/pages/item/?id=${encodeURIComponent(listing.id)}" class="d-flex align-items-center text-decoration-none text-dark">
        <div class="me-3">
          ${getMediaUrl(listing.media)}
        </div>
        <div class="flex-grow-1">
          <p class="card-title">${listing.title}</p>
          <p class="card-text text-muted">${new Date(listing.endsAt).toLocaleDateString()}</p>
        </div>
      </a>
    `;

    resultsList.appendChild(listItem);
  });

  searchResultsContainer.appendChild(resultsCard);
}
