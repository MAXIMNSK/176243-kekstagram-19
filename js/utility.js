'use strict';

// utility
(function () {
  var siteBody = document.querySelector('body');
  var photoUploaded = document.querySelector('.img-upload__preview').querySelector('img');
  var BTN_ESC_CODE = 27;
  var TIMEOUT = 10000;

  /**
   * Функция возвращает случайное число от 0 до maxNumber
   * @param {Number} maxNumber число передаваемое в функцию, являющееся верхней допустимой границей числового диапазона
   * @return {Number} возвращаем полученное рандомное число
   */
  function getRandomFromTo(maxNumber) {
    return Math.floor(Math.random() * maxNumber);
  }

  window.utility = {
    getBodySite: siteBody,
    uploadedPhoto: photoUploaded,
    KEY_ESC: BTN_ESC_CODE,
    getRandom: getRandomFromTo,
    TIMEOUT: TIMEOUT,
  };
})();
