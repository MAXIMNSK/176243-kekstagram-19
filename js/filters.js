'use strict';

// IIFE photo uploaded filters and intensivity
(function () {
  var DEFAULT_INTENSIVITY = 100;

  var photoEffectsList = document.querySelector('.effects__list');
  var percentIntensivity = DEFAULT_INTENSIVITY;
  var defaultPhotoEffect = document.querySelector('#effect-none');
  var activeFilter = defaultPhotoEffect.value;
  var intensivityScaleWrapper = document.querySelector('.img-upload__effect-level');
  // по умолчанию (при отрисовке страницы) скрываем шкалу интенсивности т.к. на старте выбран оригинальный фильтр
  intensivityScaleWrapper.classList.add('hidden');
  var intensivityEffectInput = document.querySelector('.effect-level__value');
  var elementIntensivityScale = document.querySelector('.effect-level__line');
  var pinOnScale = document.querySelector('.effect-level__pin');
  var objFilters = {
    none: function () {
      return 'none';
    },
    chrome: function () {
      return 'grayscale(' + (1 / 100) * percentIntensivity + ')';
    },
    sepia: function () {
      return 'sepia(' + (1 / 100) * percentIntensivity + ')';
    },
    marvin: function () {
      return 'invert(' + 1 * percentIntensivity + '%)';
    },
    phobos: function () {
      return 'blur(' + (3 / 100) * percentIntensivity + 'px)';
    },
    heat: function () {
      return 'brightness(' + ((3 - 1) / 100) * percentIntensivity + 1 + ')';
    },
  };

  /**
   * Функция сбрасывает на значения по умолчанию: активный фильтр, интенсивность, класс и фильтр для загруженного изображения.
   */
  function loadDefaultFilter() {
    activeFilter = defaultPhotoEffect.value;
    percentIntensivity = DEFAULT_INTENSIVITY;
    window.utility.uploadedPhoto.classList = '';
    window.utility.uploadedPhoto.style.filter = 'none';
    intensivityScaleWrapper.classList.toggle('hidden');
  }

  /**
   * Функция-обработчик вызываемая при клике на список фото-эффектов. При нажатии на фильтр, картинке передаётся класс из value фильтра. При клике на original filter - шкала скрывается, в случае если нажали не на original и шкала скрыта - шкалу интенсивности показываем. Так же выгружаем значение активного фильтра строкой в переменную activeFilter. И при смене фильтра задаём % интенсивности по умолчанию === DEFAULT_INTENSIVITY. После чего обращаемся к функции для обновления значений у целевого элемента.
   * @param {*} evt событие передаваемое в функцию по умолчанию JSом
   */
  function onEffectClick(evt) {
    if (evt.target.matches('input[type="radio"]') === true) {
      window.utility.uploadedPhoto.className = '';
      window.utility.uploadedPhoto.classList.add('effects__preview--' + evt.target.value);

      activeFilter = evt.target.value;
      percentIntensivity = DEFAULT_INTENSIVITY;
    }

    if (evt.target.matches('input[type="radio"]') === true && evt.target === defaultPhotoEffect) {
      intensivityScaleWrapper.classList.toggle('hidden');
    }

    if (evt.target.matches('input[type="radio"]') === true && evt.target !== defaultPhotoEffect && intensivityScaleWrapper.classList.contains('hidden') === true) {
      intensivityScaleWrapper.classList.toggle('hidden');
    }

    onInputIntensivityInput(activeFilter);
  }

  /**
   * Функция-обработчик определяет положение тумблера на шкале, и обновляет значение переменной percentIntensivity на актуальное. Так же актуальное значение передаём в требуемый по ТЗ инпут. Обращаемся к функции для обновления параметров целевого изображения.
   */
  function onPinMouseUp() {
    var totalWidthScale = elementIntensivityScale.offsetWidth;
    percentIntensivity = Math.round(pinOnScale.offsetLeft / (totalWidthScale / 100));
    intensivityEffectInput.value = percentIntensivity;

    onInputIntensivityInput(activeFilter);
  }

  /**
   * Функция получает имя активного фильтра и проверяет по ветвлению, когда соответствие найдено, то для фотографии обновляем фильтр задавая новый стиль (данные берем из объекта с фильтрами)
   * @param {string} currentFilter имя передаваемого активного фильтра
   */
  function onInputIntensivityInput(currentFilter) {
    if (currentFilter === 'chrome') {
      window.utility.uploadedPhoto.style.filter = objFilters.chrome();
    } else if (currentFilter === 'sepia') {
      window.utility.uploadedPhoto.style.filter = objFilters.sepia();
    } else if (currentFilter === 'marvin') {
      window.utility.uploadedPhoto.style.filter = objFilters.marvin();
    } else if (currentFilter === 'phobos') {
      window.utility.uploadedPhoto.style.filter = objFilters.phobos();
    } else if (currentFilter === 'heat') {
      window.utility.uploadedPhoto.style.filter = objFilters.heat();
    } else {
      window.utility.uploadedPhoto.style.filter = objFilters.none();
    }
  }

  photoEffectsList.addEventListener('click', onEffectClick);
  pinOnScale.addEventListener('mouseup', onPinMouseUp);

  window.filters = {
    default: loadDefaultFilter,
  };
})();
