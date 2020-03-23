'use strict';

(function () {
  var shadowBlock = document.createDocumentFragment();
  var collection = document.querySelector('.pictures');
  var filterPictures = document.querySelector('.img-filters');
  var btnFilterDefault = document.querySelector('#filter-default');
  var btnFilterRandom = document.querySelector('#filter-random');
  var btnFilterDiscussed = document.querySelector('#filter-discussed');
  var activeFilter = btnFilterDefault;

  /**
   * Функция заполняет шаблон в разметке на основе ранее сгенерированных объектов со свойствами: url / description / likes / comments - [{}]
   * @param {[]} dataObject передаем элемент массива (объект) в функцию аргументом, из которого будем получать контент и размещать в соответствующие блок в разметке
   * @return {*} возвращаем родителя с переназначенным содержимым у потомков, взятым из объекта
   */
  function fillTemplate(dataObject) {
    var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
    var cloneTemplatePicture = templatePicture.cloneNode(true);

    cloneTemplatePicture.querySelector('.picture__img').src = dataObject.url;
    cloneTemplatePicture.querySelector('.picture__likes').textContent = dataObject.likes;
    cloneTemplatePicture.querySelector('.picture__comments').textContent = dataObject.comments.message;

    return cloneTemplatePicture;
  }

  /**
   * Функция рендерит коллекцию фотографий на странице путём перебора полученного массива объектов от сервера
   * @param {[{}]} serverResponse ответ сервера в виде массива объектов
   */
  function renderCollection(serverResponse) {
    // присваиваем переменной arr массив первый ответа с сервера
    window.collectionPhoto.getCollectionResponse = serverResponse;
    removeOldCollection();
    moveFromTemplate(serverResponse);
  }

  function renderDefaultCollection() {
    var defaultCollection = window.collectionPhoto.getCollectionResponse;
    removeOldCollection();
    moveFromTemplate(defaultCollection);
  }

  /**
   * Функция рендерит рандомные 10 элементов при нажатии на кнопку "случайные" в разметке
   */
  function renderRandomCollection() {
    var defaultCollection = window.collectionPhoto.getCollectionResponse;
    var RANDOM_COUNT = 10;
    var randomUnique = [];

    // заполняем массив рандомных элементов уникальными объектами из массива объектов - оригинала
    for (var i = 0; i < RANDOM_COUNT; i++) {
      var randomElement = defaultCollection[window.utility.getRandom(defaultCollection.length)];

      if (randomUnique.includes(randomElement) === false) {
        randomUnique.push(randomElement);
      } else {
        i--;
      }
    }

    removeOldCollection();
    moveFromTemplate(randomUnique);
  }

  /**
   * Функция рендерит элементы в порядке обсуждаемости (количества коментариев) от большего к меньшему
   */
  function renderDiscussedCollection() {
    var defaultCollection = window.collectionPhoto.getCollectionResponse;
    var copyDefaultCollection = defaultCollection.slice(0);

    var discussedPhotos = copyDefaultCollection.sort(function (first, second) {
      if (first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });

    removeOldCollection();
    moveFromTemplate(discussedPhotos);
  }

  /**
   * Функция удаляет старую коллекцию фотографий перед тем как загружать новую
   */
  function removeOldCollection() {
    var currentCollection = collection.querySelectorAll('a.picture');

    for (var i = 0; i < currentCollection.length; i++) {
      currentCollection[i].remove();
    }
  }

  /**
   * Функция получает массив и на основе оного рендерит в template шаблон, который в последующем выгружает в разметку
   * @param {[]} targetArr целевой перебираемый массив, на основе которого мы будем рендерить шаблоны в shadowBlock
   */
  function moveFromTemplate(targetArr) {
    // перебираем массив обсуждаемых фотографий и заполняем shadowBlock сгенерированными шаблонами
    targetArr.forEach(function (item) {
      shadowBlock.append(fillTemplate(item));
    });

    // перемещаем отрендеренные элементы в контейнер collection, в разметке
    collection.append(shadowBlock);
  }

  /**
   * Функция показывает блок с фильтрами изображений после успешной загрузки фото-коллекции
   */
  function showPictureFilter() {
    filterPictures.classList.remove('img-filters--inactive');
  }

  /**
   * Функция срабатывает при клике на фильтр "по умолчанию" в коллекции фото
   */
  function onDefaultClick() {
    activeFilter = btnFilterDefault;
    window.debounce.excludeDebounce(renderDefaultCollection);
    activeFilterChange();
  }

  /**
   * Функция срабатывает при клике на фильтр "случайные" в коллекции фото
   */
  function onRandomClick() {
    activeFilter = btnFilterRandom;
    window.debounce.excludeDebounce(renderRandomCollection);
    activeFilterChange();
  }

  /**
   * Функция срабатывает при клике на фильтр "обсуждаемые" в коллекции фото
   */
  function onDiscussedClick() {
    activeFilter = btnFilterDiscussed;
    window.debounce.excludeDebounce(renderDiscussedCollection);
    activeFilterChange();
  }

  /**
   * Функция присваивает класс "активности" нажатой кнопке
   */
  function activeFilterChange() {
    var statusBtnActive = 'img-filters__button--active';

    if (activeFilter === btnFilterRandom) {
      btnFilterDiscussed.classList.remove(statusBtnActive);
      btnFilterDefault.classList.remove(statusBtnActive);
      btnFilterRandom.classList.add(statusBtnActive);
    } else if (activeFilter === btnFilterDiscussed) {
      btnFilterDefault.classList.remove(statusBtnActive);
      btnFilterRandom.classList.remove(statusBtnActive);
      btnFilterDiscussed.classList.add(statusBtnActive);
    } else {
      btnFilterRandom.classList.remove(statusBtnActive);
      btnFilterDiscussed.classList.remove(statusBtnActive);
      btnFilterDefault.classList.add(statusBtnActive);
    }
  }

  btnFilterDefault.addEventListener('click', onDefaultClick);
  btnFilterRandom.addEventListener('click', onRandomClick);
  btnFilterDiscussed.addEventListener('click', onDiscussedClick);

  window.collectionPhoto = {
    render: renderCollection,
    showFilter: showPictureFilter,
  };
})();
