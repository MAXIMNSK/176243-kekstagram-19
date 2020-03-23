'use strict';

// IIFE photo uploaded hashtag validation
(function () {
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_COUNT_HASHTAGS = 5;

  var hashtagsInputArea = document.querySelector('.text__hashtags');

  /**
   * Функция получает хештеги из соответствующего поля ввода, и проверяет каждый хештег на соответствие критериям (прогоняя входные данные через цикл forEach)
   */
  function onHashtagsInput() {
    var inputData = hashtagsInputArea.value.split(' ');
    inputData.forEach(checkHashtags);
  }

  /**
   * Функция проверяет входные данные по критериям
   * @param {string} element передаём в функцию содержимое обрабатываемого индекса массива
   * @param {number} index передаём в функцию индекс обрабатываемого элемента
   * @param {[]} array передаём в функцию целевой массив
   * @return {boolean} возвращает false в случае провала проверки
   */
  function checkHashtags(element, index, array) {
    var incorrectSymbolsString = '!@$%^&*()_+"№;:?-=,.';
    var incorrectSymbolsArray = incorrectSymbolsString.split('');
    var NOT_FOUND = -1;

    // проверка не не корректные символы
    for (var i = 0; i < incorrectSymbolsArray.length; i++) {
      if (element.indexOf(incorrectSymbolsArray[i]) !== NOT_FOUND) {
        hashtagsInputArea.setCustomValidity(incorrectSymbolsArray[i] + ' некорректный символ в хештеге');
        return false;
      } else {
        hashtagsInputArea.setCustomValidity('');
      }
    }

    // начинается ли индекс с решетки
    if (element[0] !== '#') {
      hashtagsInputArea.setCustomValidity('Хештег должен начинаться с #');
      return false;
    } else {
      hashtagsInputArea.setCustomValidity('');
    }

    // минимальная и максимальная длина хештега
    if (element.length < MIN_HASHTAG_LENGTH || element.length > MAX_HASHTAG_LENGTH) {
      hashtagsInputArea.setCustomValidity('Длина хештега должна быть от 2 до 20 символов (включая спецсимвол - #)');
      return false;
    } else {
      hashtagsInputArea.setCustomValidity('');
    }

    // максимальное количество хештегов
    if (array.length > MAX_COUNT_HASHTAGS) {
      hashtagsInputArea.setCustomValidity('Количество хештегов не должно превышать 5');
      return false;
    } else {
      hashtagsInputArea.setCustomValidity('');
    }

    // проверка на дублирующиеся хештеги
    for (i = 0; i < array.length; i++) {
      for (var y = 0; y < array.length; y++) {
        if (i !== y && array[i].toLowerCase().includes(array[y].toLowerCase()) === true) {
          hashtagsInputArea.setCustomValidity('Уже имеется такой хештег');
          return false;
        } else {
          hashtagsInputArea.setCustomValidity('');
        }
      }
    }

    return true;
  }

  hashtagsInputArea.addEventListener('input', onHashtagsInput);
})();
