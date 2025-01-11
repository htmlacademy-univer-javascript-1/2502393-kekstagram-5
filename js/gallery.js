import { renderingThumbnails } from './rendering.js';
import { showBigPicture } from './full-size-img.js';

const container = document.querySelector('.pictures');

const showGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (thumbnail) {
      evt.preventDefault();
      const pictureId = +thumbnail.dataset.thumbnailId;
      const picture = pictures.find((item) => item.id === pictureId);
      showBigPicture(picture);
    }
  });
  renderingThumbnails(pictures, container);
};

export { showGallery };
