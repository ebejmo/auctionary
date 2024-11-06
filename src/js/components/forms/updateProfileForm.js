import { updateProfile } from '../../api/profiles/updateProfile.js';
import { load } from '../../storage/load.js';
import { save } from '../../storage/save.js';
import { displayUserFeedback } from '../../utils/feedback.js';
import { showSpinner } from '../../utils/spinner.js';
import { populateUserDropdown } from '../profile/userDropdown.js';

export function handleProfileUpdate() {
  const form = document.querySelector('#profileForm');
  const userFeedback = document.querySelector('#feedbackMessageProfile');
  const spinner = document.querySelector('#spinnerProfile');

  const profile = load('profile');
  const currentAvatar = profile?.data?.avatar?.url || '';
  const currentBio = profile?.data?.bio || '';

  document.querySelector('#avatarUrl').value = currentAvatar;
  document.querySelector('textarea[name="bio"]').value = currentBio;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    userFeedback.style.display = 'none';
    const formData = new FormData(form);
    const avatarUrl = formData.get('avatarUrl').trim();
    const bio = formData.get('bio').trim();

    if (!avatarUrl && !bio) {
      displayUserFeedback(
        userFeedback,
        'Please provide an avatar or a bio to update.',
        'danger',
      );
      return;
    }

    const updatedProfile = {};
    if (avatarUrl) {
      updatedProfile.avatar = {
        url: avatarUrl,
        alt: 'User Avatar',
      };
    }
    if (bio) {
      updatedProfile.bio = bio;
    }

    try {
      const result = await showSpinner(spinner, () =>
        updateProfile(updatedProfile),
      );

      if (result.error) {
        displayUserFeedback(userFeedback, result.error, 'danger');
      } else {
        displayUserFeedback(
          userFeedback,
          'Profile updated successfully!',
          'success',
        );
        form.reset();

        const updatedLocalProfile = {
          ...profile,
          data: { ...profile.data, ...updatedProfile },
        };
        save('profile', updatedLocalProfile);

        document.querySelector('#profileBio').textContent = bio || currentBio;

        if (updatedProfile.avatar && updatedProfile.avatar.url) {
          updateMainAvatar(updatedProfile.avatar.url);
        }
        populateUserDropdown();

        setTimeout(() => {
          const userName = profile.data.name;
          window.location.href = `/pages/profile/?user=${encodeURIComponent(userName)}`;
        }, 2000);
      }
    } catch (error) {
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

function updateMainAvatar(avatarUrl) {
  const mainAvatar = document.querySelector('.main-avatar');
  if (mainAvatar) {
    mainAvatar.src = avatarUrl;
  }
}
