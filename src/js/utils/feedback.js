export function displayUserFeedback(container, message, type = 'danger') {
  container.textContent = message;
  container.className = `text-${type} bg-${type}-subtle p-3 rounded-3 mb-2`;
  container.style.display = 'block';
}