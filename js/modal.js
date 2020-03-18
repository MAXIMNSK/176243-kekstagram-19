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
    }
  }

  /**
   * Функция закрывает при нажатии на Esc модальные окна big-picture или img-upload__overlay. Если же в фокусе находится область ввода хештега или область ввода комментариев то модальное окно не закрывается.
   * @param {*} evt событие передаваемое в функцию по умолчанию JSом
   */
  function onPressEscKeydown(evt) {
    var successToClose;

    if (evt.keyCode === window.utility.keyEsc && blockBigPicture.classList.contains('hidden') === false) {
      blockBigPicture.classList.toggle('hidden');
      window.utility.body.classList.toggle('modal-open');
    }

    if (document.activeElement === inputHashtag || document.activeElement === inputComments) {
      successToClose = false;
    } else {
      successToClose = true;
    }

    if (evt.keyCode === window.utility.keyEsc && blockPhotoEditor.classList.contains('hidden') === false && successToClose === true) {
      blockPhotoEditor.classList.toggle('hidden');
      window.utility.body.classList.toggle('modal-open');
    }
  }

  closerBigPicture.addEventListener('click', function (evt) {
    onCloseClick(evt);
  });

  closerPhotoEditor.addEventListener('click', function (evt) {
    onCloseClick(evt);
  });

  document.addEventListener('keydown', function (evt) {
    onPressEscKeydown(evt);
  });

  uploaderPhoto.addEventListener('change', onUploaderFileChange);
})();
