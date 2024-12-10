const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;
const SCALE_STEP = 25;

const uploadPreview = document.querySelector('.img-upload__preview img');
const scaleSize = document.querySelector('.img-upload__scale');
const scaleSizeControl = scaleSize.querySelector('.scale__control--value');
const minusButton = scaleSize.querySelector('.scale__control--smaller');
const plusButton = scaleSize.querySelector('.scale__control--bigger');

let currentScale = SCALE_DEFAULT;

const getScale = (value) => {
  uploadPreview.style.transform = `scale(${value / 100})`;
  scaleSizeControl.value = `${value}%`;
};

const onMinusButtonClick = () => {
  currentScale = parseInt(scaleSizeControl.value, 10);
  let newScale = currentScale - SCALE_STEP;
  if (newScale < SCALE_MIN) {
    newScale = SCALE_MIN;
  }
  getScale(newScale);
};

const onPlusButtonClick = () => {
  currentScale = parseInt(scaleSizeControl.value, 10);
  let newScale = currentScale + SCALE_STEP;
  if (newScale > SCALE_MAX) {
    newScale = SCALE_MAX;
  }
  getScale(newScale);
};

const changeScale = () => {
  minusButton.addEventListener('click', onMinusButtonClick);
  plusButton.addEventListener('click', onPlusButtonClick);
};

const scaleReset = () => {
  getScale(SCALE_DEFAULT);
  minusButton.removeEventListener('click', changeScale(onMinusButtonClick));
  plusButton.removeEventListener('click', changeScale(onPlusButtonClick));
};
export { scaleReset };
