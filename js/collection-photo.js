'use strict';

(function () {
  var shadowBlock = document.createDocumentFragment();
  var collection = document.querySelector('.pictures');

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
    window.collectionPhoto.arr = serverResponse;

    serverResponse.forEach(function (item) {
      shadowBlock.append(fillTemplate(item));
    });

    // перемещаем отрендеренные элементы в контейнер collection, в разметке
    collection.append(shadowBlock);
  }

  window.collectionPhoto = {
    render: renderCollection,
  };
})();
