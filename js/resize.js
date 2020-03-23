'use strict';

// IIFE photo uploaded resize
(function () {
  var MIN_PHOTO_SIZE_PERCENT = 25;
  var MAX_PHOTO_SIZE_PERCENT = 100;
  var STEP_PHOTO_RESIZE_PERCENT = 25;

  var resizePhotoWrapper = document.querySelector('.img-upload__scale');
  var resizePhotoInputArea = document.querySelector('.scale__control--value');
  var resizePhotoToSmall = document.querySelector('.scale__control--smaller');
  var resizePhotoToBig = document.querySelector('.scale__control--bigger');

  /**
   * Функция сбрасывает на значения по умолчанию размер загружаемого фото
   */
  function loadDefaultSize() {
    resizePhotoInputArea.value = MAX_PHOTO_SIZE_PERCENT + '%';
    window.utility.uploadedPhoto.style.transform = 'scale(' + MAX_PHOTO_SIZE_PERCENT / MAX_PHOTO_SIZE_PERCENT + ')';
  }

  /**
   * Функция-обработчик вызываемая при клике на элемент изменяющий и отображающий размер загруженной фотографии. Если была нажата кнопка + то фото увеличивается на 25%, если на - то уменьшается на 25 (но не меньше 25 и не больше 100).
   * @param {*} evt событие передаваемое в функцию по умолчанию JSом
   */
  function onBtnResizeClick(evt) {
    var temp = +resizePhotoInputArea.value.slice(0, resizePhotoInputArea.value.length - 1);

    if (evt.target === resizePhotoToSmall) {
      if (temp > MIN_PHOTO_SIZE_PERCENT) {
        resizePhotoInputArea.value = temp - STEP_PHOTO_RESIZE_PERCENT + '%';
      }
    }

    if (evt.target === resizePhotoToBig) {
      if (temp < MAX_PHOTO_SIZE_PERCENT) {
        resizePhotoInputArea.value = temp + STEP_PHOTO_RESIZE_PERCENT + '%';
      }
    }

    // обновляем значение temp после изменения value в ветвлениях
    temp = +resizePhotoInputArea.value.slice(0, resizePhotoInputArea.value.length - 1);

    window.utility.uploadedPhoto.style.transform = 'scale(' + (temp / 100) + ')';
  }

  resizePhotoWrapper.addEventListener('click', onBtnResizeClick);

  window.resize = {
    getDefaultSize: loadDefaultSize,
  };
})();
