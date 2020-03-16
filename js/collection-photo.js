'use strict';

// // рендерим коллекцию фото (плитка на заднем плане на главной странице)
// (function () {
//   var COUNT_OBJECTS = 25;
//   var LIKES_MIN = 15;
//   var LIKES_MAX = 200;
//   var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
//   var COMMENTATOR_NAMES = ['Артём', 'Вадим', 'Пётр', 'Ксения', 'Анна', 'Мария', 'Дмитрий', 'Игорь', 'Михаил', 'Ольга', 'Кристина', 'Елена'];

//   var shadowBlock = document.createDocumentFragment();
//   var targetContentBlock = document.querySelector('.pictures');
//   var arrayObjects = [];

//   /**
//    * Функция возвращает рандомное число ОТ и ДО
//    * @param {number} min передаём в функцию минимально допустимое число
//    * @param {number} max передаём в функцию максимально допустимое число
//    * @return {number} функция возвращает число ОТ и ДО
//    */
//   function getNumberFromTo(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
//   }

//   /**
//    * Функция возвращает объект-фото со следующими свойствами: адрес / описание / количество лайков / комментарии
//    * @param {number} iteration номер итерации передаваемый в объет, для выбора номера картинки в свойстве url
//    * @return {Object} возвращает объект со следующими свойствами: адрес фото / описание / количество лайков / список комментариев к фото
//    */
//   function createElementPhoto(iteration) {
//     return {
//       url: 'photos/' + (iteration + 1) + '.jpg',
//       description: 'description photo',
//       likes: getNumberFromTo(LIKES_MIN, LIKES_MAX),
//       comments: getCommentsArray()
//     };
//   }

//   /**
//    * Функция генерирует объект-комментарий и возвращая заполняет позицию comments в объекте-фото в виде массива
//    * @return {Object} возвращает сгенерированный массив с комментариями, где каждый элемент массива является объектом со следующими свойствами: аватар комментатора / сообщение / имя комментатора. Количество комментариев рандомно генерируемых зависит от рандомно полученного числа.
//    */
//   function getCommentsArray() {
//     var random = getNumberFromTo(1, 5);
//     var tempArray = [];

//     while (random > 0) {
//       tempArray.push({
//         avatar: 'img/avatar-' + getNumberFromTo(1, 7) + '.svg',
//         message: COMMENTS[getNumberFromTo(1, COMMENTS.length)],
//         name: COMMENTATOR_NAMES[getNumberFromTo(1, COMMENTATOR_NAMES.length)]
//       });
//       random--;
//     }
//     return tempArray;
//   }

//   /**
//    * Функция заполняет шаблон в разметке на основе ранее сгенерированных объектов со свойствами: url / description / likes / comments - [{}]
//    * @param {[]} contentArray передаем целевой массив в функцию аргументом, из которого будем получать контент и размещать в соответствующие блок в разметке
//    * @return {*} возвращаем родителя с переназначенным содержимым у потомков, взятым из объектов в массиве
//    */
//   function fillTemplate(contentArray) {
//     var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
//     var cloneTemplatePicture = templatePicture.cloneNode(true);

//     cloneTemplatePicture.querySelector('.picture__img').src = contentArray.url;
//     cloneTemplatePicture.querySelector('.picture__likes').textContent = contentArray.likes;
//     cloneTemplatePicture.querySelector('.picture__comments').textContent = contentArray.comments.message;

//     return cloneTemplatePicture;
//   }

//   // генерация плитки изображений (на заднем плане главной страницы) где заполняем arrayObjects этими объектами
//   for (var i = 0; i < COUNT_OBJECTS; i++) {
//     arrayObjects.push(createElementPhoto(i));
//   }

//   for (var y = 0; y < arrayObjects.length; y++) {
//     shadowBlock.append(fillTemplate(arrayObjects[y]));
//   }

//   // перемещаем ранее сгенерированные элементы в шаблон, теперь в разметку
//   targetContentBlock.append(shadowBlock);

//   window.collectionPhoto = {
//     targetArr: arrayObjects,
//   };
// })();


(function () {
  /**
   * Функция заполняет шаблон в разметке на основе ранее сгенерированных объектов со свойствами: url / description / likes / comments - [{}]
   * @param {[]} contentArray передаем целевой массив в функцию аргументом, из которого будем получать контент и размещать в соответствующие блок в разметке
   * @return {*} возвращаем родителя с переназначенным содержимым у потомков, взятым из объектов в массиве
   */
  function fillTemplate(contentArray) {
    var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
    var cloneTemplatePicture = templatePicture.cloneNode(true);

    cloneTemplatePicture.querySelector('.picture__img').src = contentArray.url;
    cloneTemplatePicture.querySelector('.picture__likes').textContent = contentArray.likes;
    cloneTemplatePicture.querySelector('.picture__comments').textContent = contentArray.comments.message;

    return cloneTemplatePicture;
  }

  window.collectionPhoto = {
    create: fillTemplate,
  };
})();
