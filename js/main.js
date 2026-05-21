import { renderThumbnails, clearThumbnails } from './thumbnails.js';
import { showFullPhoto } from './show-full-photo.js';
import { initUploadForm, resetUploadForm, setUploadFormSubmit} from './upload-form.js';
import { getData } from './api.js';
import { showDataError, showSuccessMessage, showErrorMessage } from './notifications.js';
import { showFilters, initPhotosFiltering } from './photos-filters.js';
import { debounce } from './helpers.js';

const RERENDER_TIME = 500;
const rerenderThumbnails = (photos) => {
  clearThumbnails();
  renderThumbnails(photos);
};
const debouncedRender = debounce(rerenderThumbnails, RERENDER_TIME);

initUploadForm();
getData()
  .then((photos) => {
    renderThumbnails(photos);
    showFilters();
    initPhotosFiltering(photos, debouncedRender);
    showFullPhoto(photos);
  })
  .catch((e)=> {
    showDataError(e);
  });

setUploadFormSubmit({
  onSuccess: () => {
    resetUploadForm();
    showSuccessMessage();
  },
  onError: () => {
    showErrorMessage();
  }
});
