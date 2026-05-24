import { closeModal, openModal } from './modal.js';
import { COMMENTS_PER_PAGE, initCommentsPagination, loadMoreComments } from './comments.js';

const fullPhotoModal = document.querySelector('.big-picture');
const body = document.querySelector('body');
const closeButton = document.querySelector('.big-picture__cancel');
const comments = document.querySelector('.social__comments');
const pictureContainer = document.querySelector('.pictures');
const fullPhotoImage = document.querySelector('.big-picture__img img');
const fullPhotoDescription = document.querySelector('.social__caption');
const fullPhotoLikes = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.social__comment-total-count');
const commentsLoader = document.querySelector('.comments-loader');
const shownCommentsCount = document.querySelector('.social__comment-shown-count');

let currentCommentsHandler = null;

const fillPhotoData = (currentPhoto) => {
  fullPhotoImage.src = currentPhoto.url;
  fullPhotoImage.alt = currentPhoto.description;
  fullPhotoLikes.textContent = currentPhoto.likes;
  fullPhotoDescription.textContent = currentPhoto.description;
  commentsCount.textContent = currentPhoto.comments.length;
  comments.innerHTML = '';
};

export const showFullPhoto = (photos) => {
  const onPictureContainerClick = (evt) => {
    const thumbnail = evt.target.closest('.picture');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();
    openModal(fullPhotoModal, body);
    const photoId = Number(thumbnail.dataset.id);
    const currentPhoto = photos.find((photo) => photo.id === photoId);
    fillPhotoData(currentPhoto);

    commentsLoader.classList.toggle('hidden', currentPhoto.comments.length <= COMMENTS_PER_PAGE);

    let currentIndex = initCommentsPagination(currentPhoto.comments, comments);
    shownCommentsCount.textContent = comments.children.length;

    const onCommentsLoaderClick = () => {
      currentIndex = loadMoreComments(currentPhoto.comments, comments, currentIndex);
      shownCommentsCount.textContent = comments.children.length;
      commentsLoader.classList.toggle('hidden', comments.children.length >= currentPhoto.comments.length);
    };

    if (currentCommentsHandler) {
      commentsLoader.removeEventListener('click', currentCommentsHandler);
      currentCommentsHandler = null;
    }
    currentCommentsHandler = onCommentsLoaderClick;
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  };
  pictureContainer.addEventListener('click', onPictureContainerClick);
  const onCloseModalButtonClick = () => closeModal(fullPhotoModal, body);
  closeButton.addEventListener('click', onCloseModalButtonClick);
};
