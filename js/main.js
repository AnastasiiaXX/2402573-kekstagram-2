import { renderThumbnails } from './thumbnails.js';
import { showFullPhoto } from './show-full-photo.js';
import { initUploadForm, resetUploadForm } from './upload-form.js';
import { getData } from './api';
import { showDataError, showSuccessMessage, showErrorMessage } from './notifications.js';
import { setUploadFormSubmit } from './upload-form.js';
import { showFilters, initPhotosFiltering } from './photos-filters.js';

initUploadForm();
getData()
  .then((photos) => {
    renderThumbnails(photos);
    showFilters();
    initPhotosFiltering(photos);
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
