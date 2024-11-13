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

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

function getThumbnail ({url, description, likes, comments}) {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
}


function renderingThumbnails (pictures) {
  if (!Array.isArray(pictures)) {

    // eslint-disable-next-line no-console
    console.log ('Invalid input: \'pictures\' must be an array.');
    return;
  }
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < pictures.length; i++) {
    const picture = pictures[i];
    const thumbnail = getThumbnail(picture);
    fragment.appendChild(thumbnail);
  }

  container.appendChild(fragment);
}

export {renderingThumbnails};
