export function getMediaUrl(
  mediaArray,
  placeholderUrl = 'https://picsum.photos/1000/1000',
) {
  const url = mediaArray?.length > 0 ? mediaArray[0].url : placeholderUrl;
  const altText =
    mediaArray?.length > 0 && mediaArray[0].alt
      ? mediaArray[0].alt
      : 'Listing Image';

  return `<img src="${url}" class="img-fluid main-avatar" alt="${altText}" onerror="this.onerror=null;
   this.src='${placeholderUrl}';">`;
}
