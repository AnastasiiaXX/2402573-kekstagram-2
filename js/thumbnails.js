import { createPhotos } from './generate-data';
export const renderThumbnails = () => {
  const photos = createPhotos();

  const photoTemplate = document.querySelector('#picture').content;
  const photoContainer = document.querySelector('.pictures');

  const renderPhoto = (element) => {
    const newPhotoTemplate = photoTemplate.cloneNode(true);
    const link = newPhotoTemplate.querySelector('a');
    link.dataset.id = element.id;
    const image = newPhotoTemplate.querySelector('.picture__img');
    image.src = element.url;
    image.alt = element.description;
    const comments = newPhotoTemplate.querySelector('.picture__comments');
    comments.textContent = element.comments.length;
    const likes = newPhotoTemplate.querySelector('.picture__likes');
    likes.textContent = element.likes;
    return newPhotoTemplate;
  };

  const fragment = new DocumentFragment();

  photos.forEach((photo) => {
    const element = renderPhoto(photo);
    fragment.append(element);
  });

  photoContainer.append(fragment);
};
