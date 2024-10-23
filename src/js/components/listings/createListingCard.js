export function createListingCard(listing) {
  const mediaUrl =
    listing.media.length > 0
      ? listing.media[0].url
      : 'https://picsum.photos/200/300';
  const endsAt = new Date(listing.endsAt).toLocaleString();

  const card = document.createElement('div');
  card.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4');

  card.innerHTML = `
      <div class="card h-100">
        <img src="${mediaUrl}" class="card-img-top img-fluid" alt="${listing.title}">
        <div class="card-body d-flex flex-column justify-content-between">
          <p class="card-title">${listing.title}</p>
          <p class="card-text">Deadline: ${endsAt}</p>
          <a href="/pages/item/?id=${encodeURIComponent(listing.id)}" class="btn btn-login-dark mt-auto">View Item</a>
        </div>
      </div>
    `;

  return card;
}
