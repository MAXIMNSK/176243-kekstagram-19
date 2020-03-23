'use strict';

(function () {
  var blockBigPicture = document.querySelector('.big-picture');
  var closerBigPicture = document.querySelector('.big-picture__cancel');
  var blockPhotoEditor = document.querySelector('.img-upload__overlay');
  var closerPhotoEditor = document.querySelector('.img-upload__cancel');
  var inputHashtag = document.querySelector('.text__hashtags');
  var inputComments = document.querySelector('.text__description');
  var uploaderPhoto = document.querySelector('#upload-file');

  /**
   * Функция скрывает уведомление о возникшей ошибке при загрузке данных на сервер
   */
  function errorUpload() {
    window.modal.errorBtn = document.querySelector('.error__button');
    window.modal.errorBlock = document.querySelector('.error');
    window.modal.errorMessage = document.querySelector('.error__inner');

    window.modal.errorBtn.addEventListener('click', onErrorCloseClick);
    document.addEventListener('click', nearToErrorClick);
    document.addEventListener('keydown', onDocumentEscPress);
  }

  /**
   * При вызове функция убирает уведомление об ошибке
   */
  function onErrorCloseClick() {
    window.modal.errorBlock.remove();
  }

  /**
   * При вызове функция убирает уведомление об ошибке и удаляет слушателя событий с элемента-инициатора
   * @param {*} evt событие передаваемое в функцию
   */
  function nearToErrorClick(evt) {
    if (evt.target !== window.modal.errorMessage) {
      window.modal.errorBlock.remove();
    }
  }

  /**
   * При вызове функция убирает уведомление об ошибке и удаляет слушателя событий с элемента-инициатора
   * @param {*} evt событие передаваемое в функцию
   */
  function onDocumentEscPress(evt) {
    if (evt.keyCode === window.utility.KEY_ESC) {
      window.modal.errorBlock.remove();
    }
  }

  /**
   * Функция вызывается для скрытия уведомления об успешной загрузке данных на сервер
   */
  function successfulUpload() {
    window.modal.successBlock = document.querySelector('.success');
    window.modal.successMessage = document.querySelector('.success__inner');
    window.modal.successBtn = document.querySelector('.success__button');

    window.modal.successBtn.addEventListener('click', onSuccessCloseClick);
    document.addEventListener('click', nearToSuccessClick);
    document.addEventListener('keydown', onDocumentEscKeydown);
  }

  /**
   * При вызове функция убирает уведомление успешной загрузке
   */
  function onSuccessCloseClick() {
    window.modal.successBlock.remove();
  }

  /**
   * При вызове функция убирает уведомление о успешной загрузке и удаляет слушателя событий с элемента-инициатора
   * @param {*} evt событие передаваемое в функцию
   */
  function nearToSuccessClick(evt) {
    if (evt.target !== window.modal.successMessage) {
      window.modal.successBlock.remove();
    }
  }

  /**
   * При вызове функция убирает уведомление о успешной загрузке и удаляет слушателя событий с элемента-инициатора
   * @param {*} evt событие передаваемое в функцию
   */
  function onDocumentEscKeydown(evt) {
    if (evt.keyCode === window.utility.KEY_ESC) {
      window.modal.successBlock.remove();
    }
  }

  /**
   * Функция вызываемая при клике на кнопку закрытия модального окна
   * @param {*} evt событие передаваемое в функцию по умолчанию JSом
   */
  function onCloseClick(evt) {
    if (evt.target === closerBigPicture) {
      blockBigPicture.classList.toggle('hidden');
      window.utility.getBodySite.classList.toggle('modal-open');
    }

    if (evt.target === closerPhotoEditor) {
      blockPhotoEditor.classList.toggle('hidden');
      window.filters.getDefaultSettings();
      window.utility.getBodySite.classList.toggle('modal-open');
    }
  }

  /**
   * Функция закрывает при нажатии на Esc модальные окна big-picture или img-upload__overlay. Если же в фокусе находится область ввода хештега или область ввода комментариев то модальное окно не закрывается.
   * @param {*} evt событие передаваемое в функцию по умолчанию JSом
   */
  function onPressEscKeydown(evt) {
    var successToClose;

    if (evt.keyCode === window.utility.KEY_ESC && blockBigPicture.classList.contains('hidden') === false) {
      blockBigPicture.classList.toggle('hidden');
      window.utility.getBodySite.classList.toggle('modal-open');
    }

    if (document.activeElement === inputHashtag || document.activeElement === inputComments) {
      successToClose = false;
    } else {
      successToClose = true;
    }

    if (evt.keyCode === window.utility.KEY_ESC && blockPhotoEditor.classList.contains('hidden') === false && successToClose === true) {
      blockPhotoEditor.classList.toggle('hidden');
      window.filters.getDefaultSettings();
      window.utility.getBodySite.classList.toggle('modal-open');
    }
  }

  /**
   * Функция добавляет/удаляет класс modal-open для тега body и показывает редактор фотографии при изменении состояния photo uploader
   */
  function onUploaderFileChange() {
    if (window.utility.getBodySite.classList.contains('modal-open') === false) {
      window.utility.getBodySite.classList.toggle('modal-open');
    }

    if (blockPhotoEditor.classList.contains('hidden') === true) {
      blockPhotoEditor.classList.toggle('hidden');
    }
  }

  closerBigPicture.addEventListener('click', onCloseClick);
  closerPhotoEditor.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onPressEscKeydown);
  uploaderPhoto.addEventListener('change', onUploaderFileChange);

  window.modal = {
    closeSuccessfulUpload: successfulUpload,
    closeErrorUpload: errorUpload,
  };
})();
