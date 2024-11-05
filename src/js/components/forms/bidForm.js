import { placeBid } from '../../api/listings/placeBid.js';
import { displayUserFeedback } from '../../utils/feedback.js';

export async function handleBidForm(listingId) {
  const form = document.querySelector('#bidForm');
  const bidInput = document.querySelector('#bidAmount');
  const userFeedback = document.querySelector('#feedbackMessageBid');
  const highestBidElement = document.querySelector('#highestBid');
  const amount = parseFloat(bidInput.value);

  if (!amount || amount <= 0) {
    displayUserFeedback(
      userFeedback,
      'Please enter a valid bid amount',
      'warning',
    );
    return;
  }

  try {
    const { error, data } = await placeBid(listingId, amount);
    if (error) {
      displayUserFeedback(userFeedback, error, 'danger');
    } else {
      displayUserFeedback(userFeedback, 'Bid placed successfully!', 'success');
      form.reset();
      console.log('Bid SUCCESS:', data);

      const currentHighestBid = parseFloat(highestBidElement.textContent);
      if (amount > currentHighestBid) {
        highestBidElement.textContent = amount;
      }
    }
  } catch (error) {
    console.error('Bid error:', error);
    displayUserFeedback(userFeedback, 'Unexpected error occurred.', 'danger');
  }
}
