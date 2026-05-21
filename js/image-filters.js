const effects = {
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: ''}
};

const DEFAULT_EFFECT = 'none';

const form = document.querySelector('.img-upload__form');
const slider = form.querySelector('.effect-level__slider');
const sliderContainer = form.querySelector('.img-upload__effect-level');
const uploadedImage = form.querySelector('.img-upload__preview img');
const effectRadios = form.querySelectorAll('input[name="effect"]');
const inputValue = form.querySelector('.effect-level__value');
const noneRadioBtn = form.querySelector('input[value="none"]');

const initImageEffects = () => {
  let selectedFilter = 'none';
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 50,
    step: 1,
    connect: 'lower'
  });

  sliderContainer.classList.add('hidden');

  slider.noUiSlider.on('update', () => {
    if (selectedFilter === 'none') {
      return;
    }
    const value = parseFloat(slider.noUiSlider.get());
    const effect = effects[selectedFilter];
    const filterStyle = `${effect.filter}(${value}${effect.unit})`;
    uploadedImage.style.filter = filterStyle;
    inputValue.value = value;
  });

  effectRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      selectedFilter = radio.value;
      if (selectedFilter === DEFAULT_EFFECT) {
        sliderContainer.classList.add('hidden');
        uploadedImage.style.filter = '';
      } else {
        sliderContainer.classList.remove('hidden');

        const effect = effects[selectedFilter];
        slider.noUiSlider.updateOptions({
          range: { min: effect.min, max: effect.max },
          start: effect.max,
          step: effect.step
        });
      }
    });
  });
};

const resetImageEffects = () => {
  noneRadioBtn.checked = true;
  sliderContainer.classList.add('hidden');
  uploadedImage.style.filter = '';
};

export { resetImageEffects, initImageEffects};
