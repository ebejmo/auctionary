// import { API_BASE_URL, LISTINGS } from '../constants.js';
// import { apiRequest } from '../headers/apiRequest.js';

// export async function getTopListings() {
//   const listingsUrl = `${API_BASE_URL}${LISTINGS}?_bids=true`;

//   try {
//     const response = await apiRequest(listingsUrl, 'GET');

//     const allListings = response.data;

//     const topListings = allListings
//       .sort((a, b) => b._count.bids - a._count.bids)
//       .slice(0, 12);

//     console.log(topListings);
//     // renderTopListings(topListings)

//     return topListings;
//   } catch (error) {
//     console.error('Error fetching top listings:', error);
//     throw error;
//   }
// }
