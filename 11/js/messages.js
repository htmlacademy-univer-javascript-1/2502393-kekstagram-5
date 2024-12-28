import { isEscapeKey } from './util.js';
const successMessage = document
  .querySelector('#success')
  .content.querySelector('.success');

const errorMessage = document
  .querySelector('#error')
  .content.querySelector('.error');

const bodyElement = document.querySelector('body');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

function hideMessageOnBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.removeEventListener('click', hideMessageOnBodyClick);
}

const showMessage = (message, closeButtonSelector) => {
  bodyElement.append(message);
  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.addEventListener('click', hideMessageOnBodyClick);
  message.querySelector(closeButtonSelector).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};
export{ showSuccessMessage, showErrorMessage };
