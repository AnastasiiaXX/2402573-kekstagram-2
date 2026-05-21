import { openModal, closeModal } from './modal.js';
import { pristine } from './validator.js';
import { initImageScale, resetImageScale } from './image-scale.js';
import { initImageEffects, resetImageEffects } from './image-filters.js';
import { sendData } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};


const form = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('.img-upload__input');
const cancelBtn = form.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitBtn = form.querySelector('.img-upload__submit');
const preview = form.querySelector('.img-upload__preview img');
const previewEffects = form.querySelectorAll('.effects__preview');

const resetUploadForm = () => {
  closeModal(uploadOverlay, body);
  form.reset();
  fileInput.value = '';
  resetImageScale();
  resetImageEffects();
  pristine.reset();
};

const initUploadForm = () => {
  initImageScale();
  initImageEffects();

  fileInput.addEventListener('change', () => {
    openModal(uploadOverlay, body, resetUploadForm);
    const file = fileInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      const imageUrl = URL.createObjectURL(file);
      preview.src = imageUrl;
      previewEffects.forEach((previewEffect) => {
        previewEffect.style.backgroundImage = `url(${imageUrl})`;
      });
    }
    resetImageEffects();
  });

  cancelBtn.addEventListener('click', () => {
    closeModal(uploadOverlay, body, resetUploadForm);
  });

  const stopEscPropagation = (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  };
  hashtagInput.addEventListener('keydown', stopEscPropagation);
  commentInput.addEventListener('keydown', stopEscPropagation);
};

const onSubmit = ({ onSuccess, onError }, formData) => {
  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  submitBtn.setAttribute('disabled', 'disabled');
  submitBtn.textContent = SubmitButtonText.SENDING;

  sendData(formData)
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    })
    .finally(() => {
      // На Cypress v15 возможен ложный fail E2E-теста
      // проверки блокировки submit-кнопки из-за изменений таймингов
      submitBtn.removeAttribute('disabled');
      submitBtn.textContent = SubmitButtonText.IDLE;
    });
};
const setUploadFormSubmit = ({ onSuccess, onError }) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    onSubmit({onSuccess, onError}, formData);
  });
};

export { initUploadForm, setUploadFormSubmit, resetUploadForm };
