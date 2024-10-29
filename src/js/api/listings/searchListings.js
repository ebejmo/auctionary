import { API_BASE_URL } from '../constants.js';

export async function searchListings(query) {
  const searchUrl = `${API_BASE_URL}/auction/listings/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(searchUrl);
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching search results', error);
    return { data: [] };
  }
}
