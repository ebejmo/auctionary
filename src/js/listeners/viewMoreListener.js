import { allListings } from '../api/listings/listings.js';
import { renderListings } from '../components/listings/renderListings.js';

export function viewMoreListener() {
  const viewMoreBtn = document.querySelector('#viewMoreButton');
  let currentPage = 1;

  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
      console.log('BUTTON');
      currentPage++;
      renderListings(allListings, currentPage, true);
    });
  }
}
