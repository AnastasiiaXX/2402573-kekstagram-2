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
const cancelButton = form.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
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
  const onFileInputChange = () => {
    openModal(uploadOverlay, body, resetUploadForm);
    const file = fileInput.files[0];
    if (!file) {
      return;
    }
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(`.${it}`));
    if (matches) {
      const imageUrl = URL.createObjectURL(file);
      preview.src = imageUrl;
      previewEffects.forEach((previewEffect) => {
        previewEffect.style.backgroundImage = `url(${imageUrl})`;
      });
    }
    resetImageEffects();
  };
  const onCancelBtnClick = () => closeModal(uploadOverlay, body, resetUploadForm);

  const onTextFieldKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  };

  fileInput.addEventListener('change', onFileInputChange);
  cancelButton.addEventListener('click', onCancelBtnClick);
  hashtagInput.addEventListener('keydown', onTextFieldKeydown);
  commentInput.addEventListener('keydown', onTextFieldKeydown);
};
const onSubmit = ({ onSuccess, onError }, formData) => {
  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  submitButton.setAttribute('disabled', 'disabled');
  submitButton.textContent = SubmitButtonText.SENDING;

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
      submitButton.removeAttribute('disabled');
      submitButton.textContent = SubmitButtonText.IDLE;
    });
};
const setUploadFormSubmit = ({ onSuccess, onError }) => {
  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    onSubmit({onSuccess, onError}, formData);
  };
  form.addEventListener('submit', onFormSubmit);
};

export { initUploadForm, setUploadFormSubmit, resetUploadForm };
