// Import of styles
import '../sass/02-main.scss';

// Import the function that executes the query to the server for the searched images
import { fetchImages } from './fetchImages';

// Import of Notiflix library
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

// Import of simpleLightbox library
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Optimizing function (shortening the record) for searching for elements on the page
const qs = (selector) => document.querySelector(selector);

// Search for input and output elements
const searchForm = qs(".search-form");
const searchInput = qs(".search-form__input");
const gallery = qs(".gallery");

let pageNumber;
let displayedImages;
let totalOfHits;
let lightbox;

// Call the new search function after submitting the form
searchForm.addEventListener("submit", newSearch);

// Function finding new query results taking into account the value given in the input field
function newSearch(e) {
  e.preventDefault();
  pageNumber = 1;
  displayedImages = 0;
  searchingImages();
  gallery.innerHTML = "";
}

// Definition of the image search function contained in the backend
function searchingImages() {
  fetchImages(searchInput.value, pageNumber)
    .then(images => {
      renderImages(images);
    })
    .catch(error => console.log(error));
}

// Definition of the images rendering function based on the data taken from the backend
function renderImages({hits, totalHits}) {
  totalOfHits = totalHits;

  const markups = hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
  <div class="gallery__item">
    <a class="gallery__link" href="${largeImageURL}"><img class="gallery__img" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="gallery__info">
      <p class="info__item">
        <b class="info__label">Likes</b>
        <span class="info__data">${likes}</span>
      </p>
      <p class="info__item">
        <b class="info__label">Views</b>
        <span class="info__data">${views}</span>
      </p>
      <p class="info__item">
        <b class="info__label">Comments</b>
        <span class="info__data">${comments}</span>
      </p>
      <p class="info__item">
        <b class="info__label">Downloads</b>
        <span class="info__data">${downloads}</span>
      </p>
    </div>
  </div>
  `)
  .join("");

  gallery.insertAdjacentHTML("beforeend", markups);

  if (typeof lightbox === "object") {
    lightbox.destroy();
  }

  lightbox = new SimpleLightbox(".gallery__item a");

  displayedImages += hits.length;

  if (displayedImages === 0) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  } else if (displayedImages > 0 && pageNumber === 1) {
    Notiflix.Notify.success(`Hooray! We found ${totalOfHits} images.`);
  } else if (displayedImages > 0 && displayedImages === totalOfHits) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }

  if (pageNumber > 1) {
    const { height: cardHeight } = document
    .querySelector('.gallery .gallery__item').getBoundingClientRect();
  
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }

  if (totalOfHits === displayedImages) {
    window.removeEventListener('scroll', infiniteScrolling, {passive: true});
  } else {
    window.addEventListener('scroll', infiniteScrolling, {passive: true});
  }
}

// Function definition for infinite scrolling of images while scrolling the page
function infiniteScrolling() {
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 5) {
    loadMoreImg();
  }
}

// Definition of the function for loading more new images
function loadMoreImg() {
  pageNumber += 1;
  searchingImages();
}