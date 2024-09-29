import { register } from '../../api/auth/register.js';

export function registerFormHandler() {
  const form = document.querySelector('#registerForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const profile = {};

    profile.name = formData.get('name');
    profile.email = formData.get('email');
    profile.password = formData.get('password');

    const avatar = formData.get('avatar');
    if (avatar) {
      profile.avatar = avatar;
    }

    const bio = formData.get('bio');
    if (bio) {
      profile.bio = bio;
    }

    try {
      const response = await register(profile);
      console.log('Registration response FORM:', response);
    } catch (error) {
      console.log('ERROR!', error);
    }
  });
}
