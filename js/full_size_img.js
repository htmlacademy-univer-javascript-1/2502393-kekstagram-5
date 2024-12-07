import { isEscapeKey } from './util.js';


const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const listElement = commentListElement.querySelector('li');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const COMMENTS_STEP = 5;
let currentComments = 0;
let comments = [];

const createComment = ({ avatar, message, name }) => {
  const comment = listElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentListElement.innerHTML = '';
  currentComments += COMMENTS_STEP;
  if (currentComments >= comments.length) {
    commentsLoader.classList.add('hidden');
    currentComments = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < currentComments; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentListElement.append(fragment);
};

const onCommentsLoaderClick = () => {
  renderComments(comments);
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  currentComments = 0;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    hideBigPicture();
  }
};

const onCancelButtonClick = () => {
  hideBigPicture();
};

const renderPictureDetails = ({ url, likes, description }) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCountElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  renderPictureDetails(data);
  comments = data.comments;
  renderComments(comments);
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export { showBigPicture };
