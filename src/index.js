// Import of styles
import './sass/main.scss';

// Import the function that executes the query to the server for the searched images
import { fetchImages } from './js/fetchImages';

// Import of Axios library
import axios from 'axios';

// Import of Notiflix library
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

// Import of simpleLightbox library
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Import of lodash.debounce library
import {debounce} from 'lodash';

// Optimizing function (shortening the record) for searching for elements on the page
const qs = (selector) => document.querySelector(selector);

// Search for input and output elements
const searchForm = qs(".search-form");
const searchInput = qs(".search-form__input");
const loadMoreImgBtn = qs(".load-more");
const gallery = qs(".gallery");

let pageNumber;
let displayedImages;
let totalOfHits;

// Call the new search function after submitting the form
searchForm.addEventListener("submit", newSearch);

// Calling up the function of loading additional images after clicking on the "LOAD MORE" button
loadMoreImgBtn.addEventListener("click", loadMoreImg);

// Function finding new query results taking into account the value given in the input field
function newSearch(e) {
  e.preventDefault();
  loadMoreImgBtn.style.display = "none"
  pageNumber = 1;
  displayedImages = 0;
  searchingImages();
  gallery.innerHTML = "";
}

// Definicja funkcji ładowania nowych obrazów
function loadMoreImg() {
  pageNumber += 1;
  searchingImages();
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

  new SimpleLightbox(".gallery__item a");

  displayedImages += hits.length;
  checkingForImagesLeft();

  if (displayedImages === 0) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  } else if (displayedImages > 0 && displayedImages === totalOfHits) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  } else if (displayedImages > 0 && pageNumber === 1) {
    Notiflix.Notify.success(`Hooray! We found ${totalOfHits} images.`);
  }

  if (pageNumber > 1) {
    const { height: cardHeight } = document
    .querySelector('.gallery .gallery__item').getBoundingClientRect();
  
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

// Definition of the function to hide the "LOAD MORE" button when there are no more images to be loaded
function checkingForImagesLeft() {
  if (totalOfHits === displayedImages) {
    loadMoreImgBtn.style.display = "none";
  } else {
    loadMoreImgBtn.style.display = "block";
  }
}