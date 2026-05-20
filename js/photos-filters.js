import { renderThumbnails } from './thumbnails.js';
import { debounce } from './helpers.js';

const RERENDER_TIME = 500;

const filtersBlock = document.querySelector('.img-filters');
const filterDefaultBtn = document.querySelector('#filter-default');
const filterRandomBtn = document.querySelector('#filter-random');
const filterDiscussedBtn = document.querySelector('#filter-discussed');

const showFilters = () => {
  filtersBlock.classList.remove('img-filters--inactive');
};

const clearThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => {
    thumbnail.remove();
  });
};

const toggleActiveBtn = (btnClicked, activeclass) => {
  const activeBtn = document.querySelector(`.${activeclass}`);
  activeBtn.classList.remove(activeclass);
  btnClicked.classList.add(activeclass);
};

const rerenderThumbnails = (btn, photos, cb = null) => {
  toggleActiveBtn(btn, 'img-filters__button--active');
  const photosToRender = cb ? cb(photos) : photos;
  clearThumbnails();
  renderThumbnails(photosToRender);
};

const debouncedRender = debounce(rerenderThumbnails, RERENDER_TIME);

const initPhotosFiltering = (photos) => {
  filterDefaultBtn.addEventListener('click', () => {
    debouncedRender(filterDefaultBtn, photos);
  });

  filterRandomBtn.addEventListener('click', () => {
    debouncedRender(filterRandomBtn, photos, () => photos.slice().sort(() => 0.5 - Math.random()).slice(0, 10));
  });

  filterDiscussedBtn.addEventListener('click', () => {
    debouncedRender(filterDiscussedBtn, photos, () => photos.slice().sort((a, b) => b.comments.length - a.comments.length));
  });
};

export { showFilters, initPhotosFiltering };
