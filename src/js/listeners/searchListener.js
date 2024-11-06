import { searchListings } from '../api/listings/searchListings.js';
import { renderSearchResults } from '../components/listings/renderSearch.js';
import { displayUserFeedback } from '../utils/feedback.js';

export function searchListener() {
  const searchBtn = document.querySelector('#searchButton');

  searchBtn.addEventListener('click', async () => {
    const query = document.querySelector('#searchInput').value.trim();
    const searchResultsContainer = document.querySelector('#searchResults');

    searchResultsContainer.innerHTML = '';
    displayUserFeedback(searchResultsContainer, null);

    if (query.trim()) {
      const results = await searchListings(query);

      if (!results.data || results.data.length === 0) {
        displayUserFeedback(
          searchResultsContainer,
          'No listings match your search',
          'info',
        );
      } else {
        console.log('Search results:', results.data);
        renderSearchResults(results.data);
      }
    } else {
      displayUserFeedback(
        searchResultsContainer,
        'Search for listings by title or description',
        'warning',
      );
    }
  });
}
