import { isEscapeKey } from './helpers.js';
let currentHandler = null;

export const closeModal = (modalElement, bodyElement) => {
  modalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', currentHandler);
};
export const openModal = (modalElement, bodyElement) => {
  currentHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal(modalElement, bodyElement);
    }
  };
  modalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', currentHandler);
};
