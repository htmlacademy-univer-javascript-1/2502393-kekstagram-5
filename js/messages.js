const successMessage = document
  .querySelector('#success')
  .content.querySelector('.success');

const errorMessage = document
  .querySelector('#error')
  .content.querySelector('.error');

const bodyElement = document.querySelector('body');

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.removeEventListener('click', hideMessageOnBodyClick);
}

function hideMessageOnBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
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

