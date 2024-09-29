import { API_BASE_URL, API_AUTH, API_REGISTER } from '../constants.js';

const method = 'POST';

export async function register(user) {
  const registerUrl = API_BASE_URL + API_AUTH + API_REGISTER;

  try {
    const response = await fetch(registerUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      body: JSON.stringify(user),
    });

    const result = await response.json();

    const registrationMessage = document.querySelector('#registrationMessage');
    if (response.ok) {
      alert('Registration successful!');
      console.log('Reg ok');
    } else {
      registrationMessage.textContent =
        'Registration failed. Please try again later.';
      registrationMessage.classList.add('text-danger');
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}
