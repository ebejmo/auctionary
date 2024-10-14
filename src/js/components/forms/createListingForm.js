import { showSpinner } from '../../utils/spinner.js';
import { createListing } from '../../api/calls/createListing.js';
import { displayUserFeedback } from '../../utils/feedback.js';

export function handleCreateListingForm() {
  const form = document.querySelector('#listingsForm');
  const userFeedback = document.querySelector('#feedbackMessage');
  const spinner = document.querySelector('#spinnerListing');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    userFeedback.style.display = 'none';

    const formData = new FormData(form);
    const mediaFields = form.querySelectorAll('input[name="media[]"]');
    const media = Array.from(mediaFields).map((input) => ({
      url: input.value,
      alt: 'Media image',
    }));

    const tags = formData.get('tags')
      ? formData
          .get('tags')
          .split(',')
          .map((tag) => tag.trim())
      : [];

    const listing = {
      title: formData.get('title'),
      description: formData.get('description') || '',
      tags: tags.length ? tags : undefined,
      media: media.length ? media : undefined,
      endsAt: new Date(formData.get('endsAt')).toISOString(),
    };

    try {
      const { error, ...response } = await showSpinner(spinner, () =>
        createListing(listing),
      );

      if (error) {
        displayUserFeedback(userFeedback, error, 'danger');
      } else {
        displayUserFeedback(
          userFeedback,
          'Listing created successfully!',
          'success',
        );
        form.reset();
        console.log('Listing Created:', response);
      }
    } catch (error) {
      console.error('Listing creation error:', error);
      displayUserFeedback(userFeedback, 'Unexpected error occurred.', 'danger');
    } finally {
      spinner.style.display = 'none';
    }
  });
}
