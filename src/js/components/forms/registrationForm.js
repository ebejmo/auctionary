import { registerUser } from '../../api/auth/registerUser.js';

export function handleRegistrationForm() {
  const form = document.querySelector('#registerForm');
  const userFeedback = document.querySelector('#registrationMessage');
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
      const response = await registerUser(user);

      if (response.error) {
        userFeedback.textContent = response.error;
        userFeedback.style.display = 'block';
      } else {
        console.log('Registration SUCCESS FORM:', response);
        // Handle redirect
      }
    } catch (error) {
      console.error('Registration error FORM', error);
      userFeedback.textContent = 'Unexpected Error bro';
      userFeedback.style.display = 'block';
    }
  });
}
