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
renderBigPicture(bigPictureImage, bigPictureLikes, bigPictureCountComments, bigPictureListComments, bigPictureDescription, arrayObjects);

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
 * Функция рендерит (заполняет) наш элемент big-picture согласно ТЗ (из 0 индекса массива с объектами - arrayObjects)
 * @param {*} image тег-картинка из блока big-picture
 * @param {*} likes количество лайков к картинке
 * @param {*} countComments количество комментариев
 * @param {*} listComments список комментариев к картинке в блоке big-picture
 * @param {*} description описание к картинке
 * @param {[]} dataArray массив с объектами из которых берем данные для заполнения
 */
function renderBigPicture(image, likes, countComments, listComments, description, dataArray) {
  image.setAttribute('src', dataArray[0].url);
  likes.textContent = dataArray[0].likes;
  countComments.textContent = dataArray[0].comments.length;
  listComments.append(addForPictureComments(listComments, dataArray));
  description.textContent = dataArray[0].description;
}

/**
 * Функция сначала очищает список комментариев а потом возвращает заполненный template-элемент комментариями в список
 * @param {*} targetList целевой элемент-список с комментариями
 * @param {[]} dataArray массив с объектами из которых мы берем значения свойств для заполнения комментариев
 * @return {*} возвращаем заполненный template с комментариями
 */
function addForPictureComments(targetList, dataArray) {
  var temp = document.createElement('template');

  // очищаем список от дочерних элементов имеющихся по умолчанию
  while (targetList.firstChild) {
    targetList.removeChild(targetList.firstChild);
  }

  for (i = 0; i < dataArray[0].comments.length; i++) {
    temp.innerHTML += '<li class="social__comment"><img class="social__picture" src="' + dataArray[0].comments[i].avatar + '" alt="' + dataArray[0].comments[i].name + '" width="35" height="35"><p class="social__text">' + dataArray[0].comments[i].message + '</p></li>';
  }

  return temp.content;
}
