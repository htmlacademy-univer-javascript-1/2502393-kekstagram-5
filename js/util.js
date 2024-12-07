// Модуль с вспомогательными функциями.
// Функция getRandomInt возвращает случайное число. Думаю, ее можно считать вспомогательной.

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInt, isEscapeKey };

