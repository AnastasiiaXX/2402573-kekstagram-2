const filtersBlock = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

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
  const onFilterDefaultClick = () => {
    toggleActiveBtn(filterDefault, 'img-filters__button--active');
    onRender(photos);
  };

  const onFilterRandomClick = () => {
    toggleActiveBtn(filterRandom, 'img-filters__button--active');
    const randomPhotos = photos.slice().sort(() => 0.5 - Math.random()).slice(0, 10);
    onRender(randomPhotos);
  };

  const onFilterDiscussedClick = () => {
    toggleActiveBtn(filterDiscussed, 'img-filters__button--active');
    const discussedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
    onRender(discussedPhotos);
  };

  filterDefault.addEventListener('click', onFilterDefaultClick);
  filterRandom.addEventListener('click', onFilterRandomClick);
  filterDiscussed.addEventListener('click', onFilterDiscussedClick);
};
export { showFilters, initPhotosFiltering };
