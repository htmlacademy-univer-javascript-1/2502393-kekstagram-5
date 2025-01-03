// Отобразить фотографии других пользователей.
// Заведите модуль, который будет отвечать за отрисовку миниатюр.
// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

/* Адрес изображения url подставьте как атрибут src изображения.
  Описание изображения description подставьте в атрибут alt изображения.
  Количество лайков likes выведите в блок .picture__likes.
  Количество комментариев comments выведите в блок .picture__comments.
  Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.
*/

// Подключите модуль в проект.

const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');


function getThumbnail ({url, description, likes, comments, id}) {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
}


function renderingThumbnails (pictures, container) {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = getThumbnail(picture);
    fragment.appendChild(thumbnail);
  });

  container.appendChild(fragment);
}

export {renderingThumbnails};
