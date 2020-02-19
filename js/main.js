'use strict';

var COUNT_OBJECTS = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var ARRAY_MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var ARRAY_NAMES = ['Артём', 'Вадим', 'Пётр', 'Ксения', 'Анна', 'Мария', 'Дмитрий', 'Игорь', 'Михаил', 'Ольга', 'Кристина', 'Елена'];
var arrayObjects = [];
var shadowBlock = document.createDocumentFragment();
var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var targetContentBlock = document.querySelector('.pictures');
var siteBody = document.querySelector('body');
var bigPictureBlock = document.querySelector('.big-picture');
var bigPictureImage = bigPictureBlock.querySelector('.big-picture__img').querySelector('img');
var bigPictureLikes = bigPictureBlock.querySelector('.likes-count');
var bigPictureCountComments = bigPictureBlock.querySelector('.comments-count');
var bigPictureListComments = bigPictureBlock.querySelector('.social__comments');
var bigPictureDescription = bigPictureBlock.querySelector('.social__caption');
var bigPictureCommentCounter = bigPictureBlock.querySelector('.social__comment-count');
var bigPictureCommentsLoader = bigPictureBlock.querySelector('.comments-loader');

for (var i = 0; i < COUNT_OBJECTS; i++) {
  arrayObjects.push(createElementPhoto(i));
}

/**
 * Функция возвращает рандомное число
 * @param {number} minValue передаём в функцию минимальное число из возможных генерируемых
 * @param {number} maxValue передаём в функцию максимальное число из возможных генерируемых
 * @return {number} функция возвращает число в рамках "от" - minValue и "до" - maxValue
 */
function getRandomNumber(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue) + minValue);
}

/**
 * Функция возвращает объект-фото
 * @param {number} iteration номер итерации передаваемый в объет, для выбора номера картинки в свойстве url
 * @return {Object} возвращает объект со следующими свойствами: адрес фото / описание / количество лайков / список комментариев к фото
 */
function createElementPhoto(iteration) {
  return {
    url: 'photos/' + (iteration + 1) + '.jpg',
    description: 'description photo',
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: fillCommentsArray() // заполнить этот блядский массив  // вызов функции с сгенерированным числом от 1 до 5, а в целевой функции создать чистый массив и цикл через который будет добавляться объект в чистый массив, а когда условие будет выполнено (счетчик равен передаваемому числу - то в return пихнуть тот массив)
  };
}

/**
 * Функция заполняет массив комментариев в объекте-фото
 * @return {Object} возвращает комментарий к фото, со следующими свойствами: аватар пользователя / сообщение / имя
 */
function fillCommentsArray() {
  var random = getRandomNumber(1, 5);
  var tempArray = [];

  while (random > 0) {
    tempArray.push({
      avatar: 'img/avatar-' + getRandomNumber(1, 7) + '.svg',
      message: ARRAY_MESSAGE[getRandomNumber(1, ARRAY_MESSAGE.length)],
      name: ARRAY_NAMES[getRandomNumber(1, ARRAY_NAMES.length)]
    });
    random--;
  }
  return tempArray;
}

/**
 * Функция заполняет шаблон в разметке
 * @param {[]} contentArray передаем целевой массив в функцию аргументом, из которого будем получать контент и размещать в соответствующие блок в разметке
 * @return {*} возвращаем родителя с переназначенным содержимым у потомков, взятым из объектов в массиве
 */
function fillTemplate(contentArray) {
  var cloneTemplatePicture = templatePicture.cloneNode(true);
  cloneTemplatePicture.querySelector('.picture__img').src = contentArray.url;
  cloneTemplatePicture.querySelector('.picture__likes').textContent = contentArray.likes;
  cloneTemplatePicture.querySelector('.picture__comments').textContent = contentArray.comments.message;
  return cloneTemplatePicture;
}

for (i = 0; i < arrayObjects.length; i++) {
  shadowBlock.append(fillTemplate(arrayObjects[i]));
}

targetContentBlock.append(shadowBlock);

showOrHideBigPicture(bigPictureCommentCounter, bigPictureCommentsLoader, bigPictureBlock, siteBody);
renderBigPicture(bigPictureImage, bigPictureLikes, bigPictureCountComments, bigPictureListComments, bigPictureDescription, arrayObjects[0]);

/**
 * Функция скрывает или показывает элемент в разметке big-picture
 * @param {*} commentsCount параметр отвечает за количество комментариев
 * @param {*} commentsLoader передаём в функцию элемент-загрузчик новых комментариев
 * @param {*} elementBigPicture в данном параметре находится блок big-picture
 * @param {*} tagBody данным аргументом мы передаём в функцию тег body в нашей разметке
 */
function showOrHideBigPicture(commentsCount, commentsLoader, elementBigPicture, tagBody) {
  commentsCount.classList.toggle('hidden');
  commentsLoader.classList.toggle('hidden');
  elementBigPicture.classList.toggle('hidden');
  tagBody.classList.toggle('modal-open');
}

/**
 * Функция заполняет элемент big-picture
 * @param {*} image тег-картинка из блока big-picture
 * @param {*} likes количество лайков к картинке
 * @param {*} countComments количество комментариев
 * @param {*} listComments список комментариев к картинке в блоке big-picture
 * @param {*} description описание к картинке
 * @param {Object} contentObject целевой объект передаваемый в функцию, из которого будут браться значения его свойств
 */
function renderBigPicture(image, likes, countComments, listComments, description, contentObject) {
  image.setAttribute('src', contentObject.url);
  likes.textContent = contentObject.likes;
  countComments.textContent = contentObject.comments.length;
  getComment(listComments, contentObject);
  description.textContent = contentObject.description;
}

/**
 * Функция сначала очищает список комментариев а потом рендерит элемент в разметке, в списке комментариев
 * @param {*} listComments целевой элемент-список с комментариями
 * @param {Object} contentObject целевой объект передаваемый в функцию, из которого будут браться значения его свойств
 */
function getComment(listComments, contentObject) {
  // очищаем список от дочерних элементов имеющихся по умолчанию
  while (listComments.firstChild) {
    listComments.removeChild(listComments.firstChild);
  }

  for (i = 0; i < contentObject.comments.length; i++) {
    listComments.insertAdjacentHTML('beforeend', '<li class="social__comment"><img class="social__picture" src="' + contentObject.comments[i].avatar + '" alt="' + contentObject.comments[i].name + '" width="35" height="35"><p class="social__text">' + contentObject.comments[i].message + '</p></li>');
  }
}
