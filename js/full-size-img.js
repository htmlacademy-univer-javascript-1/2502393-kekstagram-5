import { isEscapeKey } from './util.js';

const COMMENTS_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const listElement = commentListElement.querySelector('li');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');

let currentCount = 0;
let comments = [];

const createComment = ({ avatar, message, name }) => {
  const comment = listElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  currentCount += COMMENTS_STEP;
  if (currentCount >= comments.length) {
    commentsLoader.classList.add('hidden');
    currentCount = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < currentCount; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentListElement.replaceChildren();
  commentListElement.append(fragment);
  commentCountElement.innerHTML =
    `${currentCount} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const onCommentsLoaderClick = () => {
  renderComments(comments);
};

function onDocumentKeydown (evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

function onCancelButtonClick () {
  hideBigPicture();
}

function hideBigPicture () {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  currentCount = 0;
}

const renderPictureDetails = ({ url, likes, description }) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);

  renderPictureDetails(data);
  comments = data.comments;
  if (comments?.length > 0) {
    renderComments(comments);
  }
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { showBigPicture };
