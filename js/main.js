const COMMENTS_AUTHOR_NAMES = [
  'Анна',
  'Анастасия',
  'Виктория',
  'Виктор',
  'Павел',
  'Кирилл',
  'Лидия',
  'Мария',
  'Антон',
  'Екатерина',
  'Леонид',
  'Михаил',
  'Светлана',
  'Алена',
  'Оксана',
  'Вячеслав'
];

const PHOTO_DESCRIPTIONS = [
  'Горы на рассвете',
  'Закат на море',
  'Селфи на фоне памятника',
  'Защита диплома',
  'Спящая кошка',
  'Пустой пляж',
  'Верблюды в пустыне',
  'Собака играет с мячом',
  'Дети на детской площадке',
  'Самолет в небе',
  'Толпа людей на концерте',
  'Вагон поезда',
  'Выпускной в школе',
  'Коллекция марок',
];

const COMMENTS_MESSAGES = ['Всё отлично!',
  'В целом всё неплохо.', 'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];
const getRandomInteger = (num1, num2) => {
  const lower = Math.ceil(Math.min(num1, num2));
  const upper = Math.floor(Math.max(num1, num2));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

const getRandomMessage = (array) => {
  const count = getRandomInteger(1, 2);
  return count === 1 ?
    getRandomElement(array)
    : `${getRandomElement(array)} ${getRandomElement(array)}`;
};

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
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
});

export const photos = Array.from({length: 25}, createPhoto);
