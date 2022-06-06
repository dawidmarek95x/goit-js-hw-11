// Import of styles
import './sass/main.scss';

// 
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
