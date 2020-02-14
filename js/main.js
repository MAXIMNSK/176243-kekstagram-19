'use strict';

var COUNT_OBJECTS = 25;

var arrayObjects = [];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var ARRAY_MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var ARRAY_NAMES = ['Артём', 'Вадим', 'Пётр', 'Ксения', 'Анна', 'Мария', 'Дмитрий', 'Игорь', 'Михаил', 'Ольга', 'Кристина', 'Елена'];
var shadowBlock = document.createDocumentFragment();
var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var targetContentBlock = document.querySelector('.pictures');

for (var i = 0; i < COUNT_OBJECTS; i++) {
  arrayObjects.push(createElementPhoto());

  for (var x = 0; x < getRandomNumber(1, 5); x++) {
    arrayObjects[i].comments.push(fillCommentsArray());
  }
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
 * @return {Object} возвращает объект со следующими свойствами: адрес фото / описание / количество лайков / список комментариев к фото
 */
function createElementPhoto() {
  return {
    url: 'photos/' + (i + 1) + '.jpg',
    description: 'description photo',
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: [fillCommentsArray()]
  };
}

/**
 * Функция заполняет массив комментариев в объекте-фото
 * @return {Object} возвращает комментарий к фото, со следующими свойствами: аватар пользователя / сообщение / имя
 */
function fillCommentsArray() {
  return {
    avatar: 'img/avatar-' + getRandomNumber(1, 7) + '.svg',
    message: ARRAY_MESSAGE[getRandomNumber(1, ARRAY_MESSAGE.length)],
    name: ARRAY_NAMES[getRandomNumber(1, ARRAY_NAMES.length)]
  };
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
