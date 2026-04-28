import { createPhotos } from './generate-data';
import { closeModal, openModal } from './modal.js';

const fullPhotoModal = document.querySelector('.big-picture');
const comments = document.querySelector('.social__comments');
const body = document.querySelector('body');
const closeModalButton = document.querySelector('.big-picture__cancel');

const renderComments = (mockedComments) => {
  mockedComments.forEach((commentData) => {
    const comment = document.createElement('li');
    const avatar = document.createElement('img');
    const commentText = document.createElement('p');

    comment.classList.add('social__comment');
    avatar.classList.add('social__picture');
    avatar.alt = commentData.name;
    avatar.src = commentData.avatar;
    avatar.width = 35;
    avatar.height = 35;
    commentText.classList.add('social__text');
    commentText.textContent = commentData.message;

    comment.append(avatar);
    comment.append(commentText);

    comments.append(comment);
  });
};

const fillPhotoData = (currentPhoto) => {
  const fullPhotoImage = document.querySelector('.big-picture__img img');
  const fullPhotoDescription = document.querySelector('.social__caption');
  const fullPhotoLikes = document.querySelector('.likes-count');
  const shownCommentsCount = document.querySelector('.social__comment-shown-count');
  fullPhotoImage.src = currentPhoto.url;
  fullPhotoImage.alt = currentPhoto.description;
  fullPhotoLikes.textContent = currentPhoto.likes;
  fullPhotoDescription.textContent = currentPhoto.description;
  shownCommentsCount.textContent = currentPhoto.comments.length;
  comments.innerHTML = '';
  renderComments(currentPhoto.comments);
};

export const showFullPhoto = () => {
  const photos = createPhotos();
  const thumbnails = document.querySelectorAll('.picture');
  const commentsCount = document.querySelector('.social__comment-count');
  const commentsLoaderBtn = document.querySelector('.comments-loader');

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      openModal(fullPhotoModal, body);
      commentsCount.classList.add('hidden');
      commentsLoaderBtn.classList.add('hidden');
      const photoId = Number(thumbnail.dataset.id);
      const currentPhoto = photos.find((photo) => photo.id === photoId);
      fillPhotoData(currentPhoto);
    });
  });

  closeModalButton.addEventListener('click', () => closeModal(fullPhotoModal, body));
};
