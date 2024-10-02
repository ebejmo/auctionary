import { showSpinner } from '../../utils/spinner.js';
import { registerUser } from '../../api/auth/registerUser.js';

export function handleRegistrationForm() {
  const form = document.querySelector('#registerForm');
  const userFeedback = document.querySelector('#feedbackMessage');
  const spinner = document.querySelector('#spinner');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    userFeedback.style.display = 'none';

    const formData = new FormData(form);
    const user = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      avatar: {
        url: formData.get('avatarUrl') || '',
        alt: 'User avatar',
      },
      bio: formData.get('bio') || '',
    };

    try {
      const { error, ...response } = await showSpinner(spinner, () =>
        registerUser(user),
      );

      if (error) {
        displayUserFeedback(userFeedback, error);
      } else {
        console.log('Registration SUCCESS FORM:', response);
        // Handle redirect
      }
    } catch (error) {
      console.error('Registration error:', error);
      displayUserFeedback(userFeedback, 'Unexpected error occurred.');
    } finally {
      spinner.style.display = 'none';
    }
  });
}

function displayUserFeedback(container, message) {
  container.textContent = message;
  container.style.display = 'block';
}
