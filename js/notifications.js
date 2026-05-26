import { isEscapeKey } from './helpers.js';

const ERROR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error');
const body = document.querySelector('body');

let messageDiv = null;
let messageButton = null;

const closeMessage = () => {
  messageDiv.remove();
  document.removeEventListener('keydown', handleKeydown, true);
  messageButton.removeEventListener('click', closeMessage);
  messageDiv.removeEventListener('click', handleOverlayClick);
};

function handleKeydown(evt) {
  evt.stopPropagation();
  if (isEscapeKey(evt)) {
    closeMessage();
  }
}

function handleOverlayClick(evt) {
  if (evt.target === messageDiv) {
    closeMessage();
  }
}
const showDataError = () => {
  const template = dataErrorTemplate.content.cloneNode(true);
  const errorDiv = template.firstElementChild;
  body.append(template);
  setTimeout(() => {
    errorDiv.remove();
  }, ERROR_SHOW_TIME);
};

const showMessage = (templateId, buttonClass) => {
  const template = document.querySelector(templateId).content.cloneNode(true);
  messageDiv = template.firstElementChild;
  messageButton = messageDiv.querySelector(buttonClass);
  body.append(template);

  messageButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', handleKeydown, true);
  messageDiv.addEventListener('click', handleOverlayClick);
};

const showSuccessMessage = () => showMessage('#success', '.success__button');
const showErrorMessage = () => showMessage('#error', '.error__button');

export { showDataError, showSuccessMessage, showErrorMessage };
