export function load(key) {
  const value = localStorage.getItem(key);

  if (value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error('Error parsing stored data', error);
      return null;
    }
  }

  return null;
}
