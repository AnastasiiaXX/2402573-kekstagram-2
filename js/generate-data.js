import { getRandomInteger, getRandomElement } from './helpers';
import { getPhotosData } from './data';

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const PHOTOS_COUNT = 25;
const MAX_COMMENTS_COUNT = 30;

const getRandomMessage = (array) => {
  const count = getRandomInteger(1, 2);
  return count === 1 ?
    getRandomElement(array)
    : `${getRandomElement(array)} ${getRandomElement(array)}`;
};

const { COMMENTS_AUTHOR_NAMES, COMMENTS_MESSAGES, PHOTO_DESCRIPTIONS } = getPhotosData();

const createComment = (_, index) => ({
  id: index,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomMessage(COMMENTS_MESSAGES),
  name: getRandomElement(COMMENTS_AUTHOR_NAMES),
});

const createPhoto = (_, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomElement(PHOTO_DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandomInteger(0, MAX_COMMENTS_COUNT)}, createComment),
});

export const createPhotos = () => Array.from({length: PHOTOS_COUNT}, createPhoto);
