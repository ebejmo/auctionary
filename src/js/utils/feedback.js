export function displayUserFeedback(container, message, type = 'danger') {
  const textColor =
    type === 'danger' || type === 'success' ? 'text-white' : 'text-dark';

  if (!message) {
    container.className = '';
    container.style.display = 'none';
    return;
  }

  container.className = `${textColor} bg-${type} p-3 mb-2`;
  container.textContent = message;
  container.style.display = 'block';
}
