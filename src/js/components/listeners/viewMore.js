import { allListings } from '../../api/calls/listings.js';
import { renderListings } from '../render/renderListings.js';

export function viewMoreListener() {
  const viewMoreBtn = document.querySelector('#viewMoreButton');
  let currentPage = 1;

  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
      console.log('BUTTON');
      currentPage++;
      renderListings(allListings, currentPage);
    });
  }
}
