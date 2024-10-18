export function manageMedia(mediaFieldSelector, mediaBtnSelector) {
  const mediaField = document.querySelector(mediaFieldSelector);
  const mediaBtn = document.querySelector(mediaBtnSelector);

  mediaBtn.addEventListener('click', () => {
    const newMediaField = document.createElement('div');
    newMediaField.classList.add('mb-2', 'media-field');
    newMediaField.innerHTML = `
            <label for="media" class="form-label">Media (URL)</label>
            <input type="url" class="form-control" name="media[]" placeholder="https://picsum.photos/200/300" required />
            <button type="button" class="btn btn-danger btn-sm mt-2 remove-media-button">Remove</button>
            `;
    mediaField.appendChild(newMediaField);
  });

  mediaField.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-media-button')) {
      const mediaItem = event.target.closest('.media-field');
      mediaItem.remove();
    }
  });
}
