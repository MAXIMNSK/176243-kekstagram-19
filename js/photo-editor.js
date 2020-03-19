'use strict';

(function () {
  var mainContentBlock = document.querySelector('main');
  var photoEditorBlock = document.querySelector('.img-upload__overlay');
  var form = document.querySelector('.img-upload__form');
  var notificationSuccess = document.querySelector('#success').content.querySelector('.success');
  var notificationError = document.querySelector('#error').content.querySelector('.error');

  /**
   * В случае успешной загрузки файла на сервер показываем соответствующее сообщение и сбрасываем параметры фото редактора
   */
  function responseOk() {
    defaultParameters();
    mainContentBlock.appendChild(notificationSuccess);
    window.modal.closeSuccessfulUpload();
  }

  /**
   * В случае не успешной загрузки файла на сервер показываем соответствующее сообщение и сбрасываем параметры фото редактора
   */
  function responseError() {
    defaultParameters();
    mainContentBlock.appendChild(notificationError);
    window.modal.closeErrorUpload();
  }

  /**
   * Прочие параметры которые мы сбрасываем на значения по умолчанию
   */
  function defaultParameters() {
    window.utility.body.classList.toggle('modal-open');
    photoEditorBlock.classList.toggle('hidden');
    form.reset();
    window.filters.default();
    window.resize.default();
  }

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.network.upload(new FormData(form), responseOk, responseError);
  });
})();
