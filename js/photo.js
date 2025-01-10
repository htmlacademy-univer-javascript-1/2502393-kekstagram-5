const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadInput = document.querySelector('.img-upload__input');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__item .effects__preview');


const onUploadPhotoForm = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);

    effectPreviews.forEach((previewElement) => {
      previewElement.style.backgroundImage = `url('${imgUploadPreview.src}')`;
    });
  }
};

uploadInput.addEventListener('change', onUploadPhotoForm);
