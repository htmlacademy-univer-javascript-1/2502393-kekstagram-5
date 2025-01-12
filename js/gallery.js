import { renderingThumbnails } from './rendering.js';
import { showBigPicture } from './full-size-img.js';

const container = document.querySelector('.pictures');

let pictures = [];

const onContainerClick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (thumbnail) {
    evt.preventDefault();
    const pictureId = +thumbnail.dataset.thumbnailId;
    const picture = pictures.find((item) => item.id === pictureId);
    showBigPicture(picture);
  }
};

const showGallery = (currentPictures) => {
  pictures = currentPictures;
  renderingThumbnails(pictures, container);
  container.addEventListener('click', onContainerClick);

};

export { showGallery };
