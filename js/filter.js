import { scaleReset } from './scale.js';

const DEFAULT_EFFECT = {
  name: 'none',
  filter: 'none',
  min: 0,
  max: 100,
  step: 1,
  unit: '',
};

const effectsList = {
  none: {
    filter: DEFAULT_EFFECT.filter,
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  chrome: {
    class: 'effects__preview--chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    class: 'effects__preview--sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    class: 'effects__preview--marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    class: 'effects__preview--phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    class: 'effects__preview--heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const uploadPreview = document.querySelector('.img-upload__preview img');
const effectsLevel = document.querySelector('.img-upload__effect-level');
const effectsLevelSlider = document.querySelector('.effect-level__slider');
const effectsLevelValue = document.querySelector('.effect-level__value');
const effectsContainer = document.querySelector('.effects');
let currentEffect = DEFAULT_EFFECT;

const isDefault = () => currentEffect.filter === DEFAULT_EFFECT.filter;

const getSlider = () => noUiSlider.create(effectsLevelSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
effectsLevel.classList.add('hidden');

const showSlider = () => {
  if (isDefault()) {
    effectsLevel.classList.add('hidden');
  } else {
    effectsLevel.classList.remove('hidden');
  }
};

const changeSlider = () => {
  effectsLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,
    connect: 'lower',
  });

  showSlider();
};

const changeEffectContainer = (evt) => {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }
  const effectName = evt.target.value;
  changeEffect(effectName);
};

function changeEffect(effect) {
  currentEffect = effectsList[effect];
  changeSlider();
}

const usingSlider = () => {
  const currentValueEffect = effectsLevelSlider.noUiSlider.get();
  if (isDefault()) {
    uploadPreview.style.filter = 'none';
    scaleReset();
  }

  uploadPreview.style.filter = `${currentEffect.filter}(${currentValueEffect}${currentEffect.unit})`;
  effectsLevelValue.value = currentValueEffect;
};

const sliderOperation = () => {
  getSlider();
  usingSlider();
  effectsContainer.addEventListener('change', changeEffectContainer);
  effectsLevelSlider.noUiSlider.on('update', usingSlider);
};

const removeSlider = () => {
  effectsContainer.removeEventListener('change', changeEffectContainer);
  effectsLevelSlider.noUiSlider.destroy();
};

const removeEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  changeSlider();
};
export { sliderOperation, removeSlider, removeEffects };
