import { isEscapeKey } from './util.js';
import { scaleReset } from './scale.js';
import { sliderOperation, removeSlider, removeEffects } from './filter.js';


const MAX_HASHTAGS_COUNT = 5;
const VALID_HASHTAGS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;

const errorMessages = {
  UNIQUENESS_ERROR: 'Хэштеги должны быть уникальными',
  INCORRECT_HASHTAG: 'Хэш-тег должен начинаться с #, состоять из букв и чисел, исключая пробелы, максимальная длина 20 символов, включая #',
  COUNT_HASHTADS_ERROR: `Максимум ${MAX_HASHTAGS_COUNT} хэш-тегов`,
  COMMENT_MAXLENGTH_ERROR: `Длина комментария не больше ${MAX_COMMENT_LENGTH} символов`
};


const bodyElement = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadHashtag = uploadForm.querySelector('.text__hashtags');
const uploadComment = uploadForm.querySelector('.text__description');

const uploadSubmitButton = uploadForm.querySelector('.img-upload__submit');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  sliderOperation();
};

const hideForm = () => {
  uploadForm.reset();
  pristine.reset();
  scaleReset();
  removeEffects();
  removeSlider();
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const parseHashtags = (hashtag) => hashtag.trim().split(' ').filter((currentHashtag) => Boolean(currentHashtag.length));

const isInputOnFocused = () => document.activeElement === uploadHashtag || document.activeElement === uploadForm.querySelector('.text__description');

const validateHashtagsCount = (value) => parseHashtags(value).length <= MAX_HASHTAGS_COUNT;

const validateHashtagsFormat = (hashtag) => parseHashtags(hashtag).every((thisHashtag) => VALID_HASHTAGS.test(thisHashtag));

const validateUniqueHashtags = (hashtag) => {
  const lowercaseHashtags = parseHashtags(hashtag).map((currentHashtag) => currentHashtag.toLowerCase());
  return lowercaseHashtags.length === new Set(lowercaseHashtags).size;
};

function onDocumentKeydown(evt) {
  if (document.querySelector('.error') === null && isEscapeKey(evt) && !isInputOnFocused()) {
    evt.preventDefault();
    hideForm();
  }
}

const checkComment = (value) => value.length <= MAX_COMMENT_LENGTH;


const handleCancelClick = () => hideForm();
const handleInputChange = () => openForm();

pristine.addValidator(
  uploadHashtag,
  validateUniqueHashtags,
  errorMessages.UNIQUENESS_ERROR,
  1,
  true
);

pristine.addValidator(
  uploadHashtag,
  validateHashtagsFormat,
  errorMessages.INCORRECT_HASHTAG,
  2,
  true
);

pristine.addValidator(
  uploadHashtag,
  validateHashtagsCount,
  errorMessages.COUNT_HASHTADS_ERROR,
  3,
  true
);

pristine.addValidator(
  uploadComment,
  checkComment,
  errorMessages.COMMENT_MAXLENGTH_ERROR,
  4,
  true
);

uploadForm.querySelector('.img-upload__input').addEventListener('change', handleInputChange);
uploadForm.querySelector('.img-upload__cancel').addEventListener('click', handleCancelClick);

sliderOperation();

const handleFormSubmission = (callback) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault(); // предотвращение стандартной отправки формы

    const isValid = pristine.validate();
    if (isValid) {
      uploadSubmitButton.disabled = true; // блокировка кнопки отправки

      // Обработка формы с колбэком
      callback(new FormData(uploadForm))
        .then(() => {
          uploadSubmitButton.disabled = false;
        });
    }
  });
};

export { hideForm, handleFormSubmission };
