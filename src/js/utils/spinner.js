export async function showSpinner(spinner, asyncTask) {
  spinner.classList.add('show');
  try {
    const result = await asyncTask();
    return result;
  } finally {
    spinner.classList.remove('show');
  }
}
