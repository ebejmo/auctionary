import { loginUser } from '../../api/auth/login.js';
import { displayUserFeedback } from '../../utils/feedback.js';
import { showSpinner } from '../../utils/spinner.js';

export function handleLoginForm() {
  const form = document.querySelector('#loginForm');
  const userFeedback = document.querySelector('#feedbackMessageLogin');
  const spinner = document.querySelector('#spinnerLogin');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    userFeedback.style.display = 'none';

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const { error, ...response } = await showSpinner(spinner, () =>
        loginUser(email, password),
      );

      if (error) {
        displayUserFeedback(userFeedback, error, 'danger');
      } else {
        displayUserFeedback(
          userFeedback,
          'Login successful! Redirecting...',
          'success',
        );
        console.log('Login SUCCESS:', response);
      }

      //   setTimeout(() => {
      //     // window.location.href = '../../../../pages/profile/';
      //   }, 2000);
    } catch (error) {
      console.log('This is the error and we are not logged in.');
      console.error('Login error:', error);
      displayUserFeedback(
        userFeedback,
        error.message || 'Unexpected error occurred.',
        'danger',
      );
    } finally {
      spinner.style.display = 'none';
    }
  });
}
