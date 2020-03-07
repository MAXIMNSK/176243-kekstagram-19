'use strict';

(function () {
  var BTN_ESC_CODE = 27;

  var blockBigPicture = document.querySelector('.big-picture');
  var closerBigPicture = document.querySelector('.big-picture__cancel');
  var blockPhotoEditor = document.querySelector('.img-upload__overlay');
  var closerPhotoEditor = document.querySelector('.img-upload__cancel');
  var formPhotoEditor = document.querySelector('.img-upload__form');
  var inputHashtag = document.querySelector('.text__hashtags');
  var inputComments = document.querySelector('.text__description');

  /**
   * Функция вызываемая при клике на кнопку закрытия модального окна
   * @param {*} evt событие передаваемое в функцию по умолчанию JSом
   */
  function onCloseClick(evt) {
    if (evt.target === closerBigPicture) {
      blockBigPicture.classList.toggle('hidden');
      window.utility.body.classList.toggle('modal-open');
    }

    if (evt.target === closerPhotoEditor) {
      blockPhotoEditor.classList.toggle('hidden');
      window.utility.body.classList.toggle('modal-open');
      formPhotoEditor.reset();
    }
  }

  /**
   * Функция закрывает при нажатии на Esc модальные окна big-picture или img-upload__overlay. Если же в фокусе находится область ввода хештега или область ввода комментариев то модальное окно не закрывается.
   * @param {*} evt событие передаваемое в функцию по умолчанию JSом
   */
  function onPressEscKeydown(evt) {
    var successToClose;

    if (evt.keyCode === BTN_ESC_CODE && blockBigPicture.classList.contains('hidden') === false) {
      blockBigPicture.classList.toggle('hidden');
      window.utility.body.classList.toggle('modal-open');
    }

    if (document.activeElement === inputHashtag || document.activeElement === inputComments) {
      successToClose = false;
    } else {
      successToClose = true;
    }

    if (evt.keyCode === BTN_ESC_CODE && blockPhotoEditor.classList.contains('hidden') === false && successToClose === true) {
      blockPhotoEditor.classList.toggle('hidden');
      window.utility.body.classList.toggle('modal-open');
      formPhotoEditor.reset();
    }
  }

  window.modalCloser = {
    clickClose: onCloseClick,
    pressEsc: onPressEscKeydown,
  };
})();
