import { isEscapeKey } from './helpers.js';

const ERROR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error');
const body = document.querySelector('body');
const showDataError = () => {
  const template = dataErrorTemplate.content.cloneNode(true);
  const errorDiv = template.firstElementChild;
  body.append(template);
  setTimeout(() => {
    errorDiv.remove();
  }, ERROR_SHOW_TIME);
};
const showMessage = (templateId, buttonClass) => {
  let onDocumentKeydown = null;
  let onMessageDivClick = null;

  const template = document.querySelector(templateId).content.cloneNode(true);
  const messageDiv = template.firstElementChild;
  const messageButton = messageDiv.querySelector(buttonClass);
  body.append(template);

  const onMessageButtonClick = () => {
    messageDiv.remove();
    document.removeEventListener('keydown', onDocumentKeydown, true);
    messageDiv.removeEventListener('click', onMessageDivClick);
  };

  onDocumentKeydown = (evt) => {
    evt.stopPropagation();
    if (isEscapeKey(evt)) {
      onMessageButtonClick();
    }
  };

  onMessageDivClick = (evt) => {
    if (evt.target === messageDiv) {
      onMessageButtonClick();
    }
  };
  messageButton.addEventListener('click', onMessageButtonClick);
  document.addEventListener('keydown', onDocumentKeydown, true);
  messageDiv.addEventListener('click', onMessageDivClick);
};

const showSuccessMessage = () => showMessage('#success', '.success__button');
const showErrorMessage = () => showMessage('#error', '.error__button');

export { showDataError, showSuccessMessage, showErrorMessage };
