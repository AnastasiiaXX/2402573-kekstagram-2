const filtersBlock = document.querySelector('.img-filters');
const filterDefaultBtn = document.querySelector('#filter-default');
const filterRandomBtn = document.querySelector('#filter-random');
const filterDiscussedBtn = document.querySelector('#filter-discussed');

const showFilters = () => {
  filtersBlock.classList.remove('img-filters--inactive');
};

const toggleActiveBtn = (btnClicked, activeClass) => {
  const activeBtn = document.querySelector(`.${activeClass}`);
  if (activeBtn) {
    activeBtn.classList.remove(activeClass);
  }
  btnClicked.classList.add(activeClass);
  void btnClicked.offsetWidth;
};
const initPhotosFiltering = (photos, onRender) => {

  filterDefaultBtn.addEventListener('click', () => {
    toggleActiveBtn(filterDefaultBtn, 'img-filters__button--active');
    onRender(photos);
  });

  filterRandomBtn.addEventListener('click', () => {
    toggleActiveBtn(filterRandomBtn, 'img-filters__button--active');
    const randomPhotos = photos.slice().sort(() => 0.5 - Math.random()).slice(0, 10);
    onRender(randomPhotos);
  });

  filterDiscussedBtn.addEventListener('click', () => {
    toggleActiveBtn(filterDiscussedBtn, 'img-filters__button--active');
    const discussedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
    onRender(discussedPhotos);
  });
};

export { showFilters, initPhotosFiltering };
