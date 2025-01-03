// Модуль с вспомогательными функциями.
// Функция getRandomInt возвращает случайное число. Думаю, ее можно считать вспомогательной.

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.zIndex = '100';
  alert.style.position = 'absolute';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '20px 30px';
  alert.style.fontSize = '24px';
  alert.style.fontWeight = 'bold';
  alert.style.textAlign = 'center';

  alert.style.backgroundColor = '#003366';
  alert.style.border = '1px solid #002244';
  alert.style.color = '#f5deb3';

  alert.style.borderRadius = '8px';
  alert.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
  alert.style.opacity = '0.9';

  alert.textContent = message;
  document.body.append(alert);
};

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export { getRandomInt, isEscapeKey, showAlert, debounce };

