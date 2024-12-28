
import { showGallery } from './gallery.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { hideForm, handleFormSubmission } from './form.js';
import { fetchData, submitData } from './api.js';
import { showAlert } from './util.js';
import './form.js';


try {
  showGallery(await fetchData());
} catch (err) {
  showAlert(err.message);
}
handleFormSubmission(async (data) => {
  try {
    await submitData(data);
    hideForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});
