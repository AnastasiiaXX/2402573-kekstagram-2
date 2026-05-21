const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const PERCENT_DIVIDER = 100;

const form = document.querySelector('.img-upload__form');
const scaleSmallerBtn = form.querySelector('.scale__control--smaller');
const scaleBiggerBtn = form.querySelector('.scale__control--bigger');
const scaleControlValue = form.querySelector('.scale__control--value');
const uploadedImage = form.querySelector('.img-upload__preview img');

let currentScale = MAX_SCALE;
const initImageScale = () => {
  scaleSmallerBtn.addEventListener('click', () => {
    if (currentScale > MIN_SCALE) {
      currentScale -= SCALE_STEP;
      scaleControlValue.value = `${currentScale}%`;
      uploadedImage.style.transform = `scale(${currentScale / PERCENT_DIVIDER})`;
    }
  });

  scaleBiggerBtn.addEventListener('click', () => {
    if (currentScale < MAX_SCALE) {
      currentScale += SCALE_STEP;
      scaleControlValue.value = `${currentScale}%`;
      uploadedImage.style.transform = `scale(${currentScale / PERCENT_DIVIDER})`;
    }
  });
};

const resetImageScale = () => {
  currentScale = MAX_SCALE;
  scaleControlValue.value = `${currentScale}%`;
  uploadedImage.style.transform = 'scale(1)';
};

export { resetImageScale, initImageScale};
