'use strict';

(function () {
  var shadowBlock = document.createDocumentFragment();
  var collection = document.querySelector('.pictures');
  var filterPictures = document.querySelector('.img-filters');
  var btnFilterDefault = document.querySelector('#filter-default');
  var btnFilterRandom = document.querySelector('#filter-random');
  var btnFilterDiscussed = document.querySelector('#filter-discussed');

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
    window.collectionPhoto.arr = serverResponse;

    removeOldCollection();
    moveFromTemplate(serverResponse);
  }

  function renderDefaultCollection() {
    var defaultCollection = window.collectionPhoto.arr;

    removeOldCollection();
    moveFromTemplate(defaultCollection);
  }

  /**
   * Функция рендерит рандомные 10 элементов при нажатии на кнопку "случайные" в разметке
   */
  function renderRandomCollection() {
    var defaultCollection = window.collectionPhoto.arr;
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
    var defaultCollection = window.collectionPhoto.arr;
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

  btnFilterDefault.addEventListener('click', function () {
    window.debounce.func(renderDefaultCollection);
  });

  btnFilterRandom.addEventListener('click', function () {
    window.debounce.func(renderRandomCollection);
  });

  btnFilterDiscussed.addEventListener('click', function () {
    window.debounce.func(renderDiscussedCollection);
  });

  window.collectionPhoto = {
    render: renderCollection,
    showFilter: showPictureFilter,
  };
})();
