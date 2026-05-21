import { closeModal, openModal } from './modal.js';
import { paginateComments } from './comments.js';

const fullPhotoModal = document.querySelector('.big-picture');
const body = document.querySelector('body');
const closeModalButton = document.querySelector('.big-picture__cancel');
const comments = document.querySelector('.social__comments');
const pictureContainer = document.querySelector('.pictures');

const fillPhotoData = (currentPhoto) => {
  const fullPhotoImage = document.querySelector('.big-picture__img img');
  const fullPhotoDescription = document.querySelector('.social__caption');
  const fullPhotoLikes = document.querySelector('.likes-count');
  const commentsCount = document.querySelector('.social__comment-total-count');

  fullPhotoImage.src = currentPhoto.url;
  fullPhotoImage.alt = currentPhoto.description;
  fullPhotoLikes.textContent = currentPhoto.likes;
  fullPhotoDescription.textContent = currentPhoto.description;
  commentsCount.textContent = currentPhoto.comments.length;
  comments.innerHTML = '';
};

export const showFullPhoto = (photos) => {
  const commentsLoaderBtn = document.querySelector('.comments-loader');
  const shownCommentsCount = document.querySelector('.social__comment-shown-count');

  pictureContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('.picture');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();
    openModal(fullPhotoModal, body);
    const photoId = Number(thumbnail.dataset.id);
    const currentPhoto = photos.find((photo) => photo.id === photoId);
    fillPhotoData(currentPhoto);

    commentsLoaderBtn.classList.toggle('hidden', currentPhoto.comments.length <= 5);
    const pagination = paginateComments(currentPhoto.comments, comments);
    shownCommentsCount.textContent = pagination.getShownCount();

    commentsLoaderBtn.onclick = () => {
      pagination.loadMore();
      shownCommentsCount.textContent = pagination.getShownCount();
      commentsLoaderBtn.classList.toggle('hidden', pagination.getShownCount() >= currentPhoto.comments.length);
    };
  });

  closeModalButton.addEventListener('click', () => closeModal(fullPhotoModal, body));
};
