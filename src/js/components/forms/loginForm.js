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
        form.reset();
        console.log('Login SUCCESS:', response);
      }
    } catch (error) {
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
