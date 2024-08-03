const form = document.querySelector('form');
const input = document.querySelector('#input-box');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = encodeURIComponent(input.value);
  window.location.href = `/products?search=${searchTerm}`;
});


