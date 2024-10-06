import { getAllListings } from './api/calls/listings.js';
import { API_BASE_URL } from './api/constants.js';
import { handleLoginForm } from './components/forms/loginForm.js';
import { handleRegistrationForm } from './components/forms/registrationForm.js';
import { viewMoreListener } from './components/listeners/viewMore.js';

handleRegistrationForm();
handleLoginForm();
getAllListings();
viewMoreListener();

console.log(API_BASE_URL);
