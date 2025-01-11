import { showGallery } from './gallery.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { hideForm, handleFormSubmission } from './form.js';
import { fetchData, submitData } from './api.js';
import { showAlert, debounce } from './util.js';
import './form.js';
import { init, getFilterPictures } from './order.js';

import './photo.js';

handleFormSubmission(async (data) => {
  try {
    await submitData(data);
    hideForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  init(await fetchData(), debounce(showGallery));
  showGallery(getFilterPictures());
} catch (err) {
  showAlert(err.message);
}
