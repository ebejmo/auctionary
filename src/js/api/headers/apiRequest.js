import { API_KEY } from '../constants.js';

export async function apiRequest(url, method = 'GET', bodyData = null) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': API_KEY,
    };

    const options = {
      method,
      headers,
    };

    if (bodyData) {
      options.body = JSON.stringify(bodyData);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.errors?.[0]?.message ||
        `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.log('Error during API request:', error);
    throw error;
  }
}

// export async function apiRequest(url, method = 'GET', bodyData = null) {
//   try {
//     //   const token = load("token");

//     const headers = {
//       'Content-Type': 'application/json',
//       'X-Noroff-API-Key': API_KEY,
//     };

//     // Add the Authorization header if a token is available
//     //   if (token) {
//     //     headers.Authorization = `Bearer ${token}`;
//     //   }

//     // Set up the request options
//     const options = {
//       method,
//       headers,
//     };

//     if (bodyData) {
//       options.body = JSON.stringify(bodyData);
//     }

//     const response = await fetch(url, options);

//     // Check if the response is OK
//     if (!response.ok) {
//       //   const errorData = await response.json();
//       // throw new Error(errorData.errors?.[0]?.message);
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     // return await response.json();
//     return response;
//   } catch (error) {
//     console.log('Error during API request:', error);
//     throw error;
//   }
// }
