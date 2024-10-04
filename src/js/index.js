import { API_BASE_URL } from './api/constants.js';
import { handleLoginForm } from './components/forms/loginForm.js';
import { handleRegistrationForm } from './components/forms/registrationForm.js';

handleRegistrationForm();
handleLoginForm();

console.log(API_BASE_URL);
