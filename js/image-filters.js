const SLIDER_DEFAULT_MIN = 0;
const SLIDER_DEFAULT_MAX = 100;
const SLIDER_DEFAULT_START = 50;
const SLIDER_DEFAULT_STEP = 1;
const DEFAULT_EFFECT = 'none';

const effects = {
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: ''}
};

const form = document.querySelector('.img-upload__form');
const slider = form.querySelector('.effect-level__slider');
const sliderWrapper = form.querySelector('.img-upload__effect-level');
const uploadedImage = form.querySelector('.img-upload__preview img');
const effectRadios = form.querySelectorAll('input[name="effect"]');
const inputValue = form.querySelector('.effect-level__value');
const noneRadio = form.querySelector('input[value="none"]');

const initImageEffects = () => {
  let selectedFilter = DEFAULT_EFFECT;
  noUiSlider.create(slider, {
    range: {
      min: SLIDER_DEFAULT_MIN,
      max: SLIDER_DEFAULT_MAX,
    },
    start: SLIDER_DEFAULT_START,
    step: SLIDER_DEFAULT_STEP,
    connect: 'lower'
  });

  sliderWrapper.classList.add('hidden');

  const onSliderUpdate = () => {
    if (selectedFilter === DEFAULT_EFFECT) {
      return;
    }
    const value = parseFloat(slider.noUiSlider.get());
    const effect = effects[selectedFilter];
    const filterStyle = `${effect.filter}(${value}${effect.unit})`;
    uploadedImage.style.filter = filterStyle;
    inputValue.value = value;
  };

  slider.noUiSlider.on('update', onSliderUpdate);

  const onEffectRadioChange = (evt) => {
    selectedFilter = evt.target.value;
    if (selectedFilter === DEFAULT_EFFECT) {
      sliderWrapper.classList.add('hidden');
      uploadedImage.style.filter = '';
    } else {
      sliderWrapper.classList.remove('hidden');
      const effect = effects[selectedFilter];
      slider.noUiSlider.updateOptions({
        range: { min: effect.min, max: effect.max },
        start: effect.max,
        step: effect.step
      });
    }
  };

  effectRadios.forEach((radio) => {
    radio.addEventListener('change', onEffectRadioChange);
  });
};

const resetImageEffects = () => {
  noneRadio.checked = true;
  sliderWrapper.classList.add('hidden');
  uploadedImage.style.filter = '';
};

export { resetImageEffects, initImageEffects};
