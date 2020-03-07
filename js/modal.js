'use strict';

(function () {
  var closerBigPicture = document.querySelector('.big-picture__cancel');
  var uploaderPhoto = document.querySelector('#upload-file');
  var blockPhotoEditor = document.querySelector('.img-upload__overlay');
  var closerPhotoEditor = document.querySelector('.img-upload__cancel');

  /**
   * Функция добавляет/удаляет класс modal-open для тега body и показывает редактор фотографии при изменении состояния photo uploader
   */
  function onUploaderFileChange() {
    if (window.utility.body.classList.contains('modal-open') === false) {
      window.utility.body.classList.toggle('modal-open');
    }

    if (blockPhotoEditor.classList.contains('hidden') === true) {
      blockPhotoEditor.classList.toggle('hidden');
    }
  }

  closerBigPicture.addEventListener('click', function (evt) {
    window.modalCloser.clickClose(evt);
  });

  closerPhotoEditor.addEventListener('click', function (evt) {
    window.modalCloser.clickClose(evt);
  });

  document.addEventListener('keydown', function (evt) {
    window.modalCloser.pressEsc(evt);
  });

  uploaderPhoto.addEventListener('change', onUploaderFileChange);
})();
