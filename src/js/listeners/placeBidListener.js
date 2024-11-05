import { handleBidForm } from '../components/forms/bidForm.js';

export function bidListener(listingId) {
  const form = document.querySelector('#bidForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    handleBidForm(listingId);
  });
}
