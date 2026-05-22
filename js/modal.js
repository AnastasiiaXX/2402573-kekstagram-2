import { isEscapeKey } from './helpers.js';
let onDocumentKeydown = null;

export const closeModal = (modalElement, bodyElement, onClose = null) => {
  modalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  if (onClose) {
    onClose();
  }
};
export const openModal = (modalElement, bodyElement, onClose = null) => {
  onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal(modalElement, bodyElement, onClose);
    }
  };
  modalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};
