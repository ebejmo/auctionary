import { API_BASE_URL } from '../constants.js';
import { apiRequest } from '../headers/apiRequest.js';

export async function placeBid(listingId, amount) {
  const bidUrl = `${API_BASE_URL}/auction/listings/${encodeURIComponent(listingId)}/bids`;

  const requestBody = {
    amount,
  };

  try {
    const response = await apiRequest(bidUrl, 'POST', requestBody);
    return response;
  } catch (error) {
    console.error('Error placing bid', error);
    return { error: error.message };
  }
}
