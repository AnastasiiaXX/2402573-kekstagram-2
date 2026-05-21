import { isEscapeKey } from './helpers.js';
let currentHandler = null;

export const closeModal = (modalElement, bodyElement, onClose = null) => {
  modalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', currentHandler);

  if (onClose) {
    onClose();
  }
};
export const openModal = (modalElement, bodyElement, onClose = null) => {
  currentHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal(modalElement, bodyElement, onClose);
    }
  };
  modalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', currentHandler);
};
