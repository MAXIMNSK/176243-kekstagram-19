'use strict';

var COUNT_OBJECTS = 25;

var arrayObjects = [];
var likesMin = 15;
var likesMax = 200;
var arrayMessage = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var arrayNames = ['Артём', 'Вадим', 'Пётр', 'Ксения', 'Анна', 'Мария', 'Дмитрий', 'Игорь', 'Михаил', 'Ольга', 'Кристина', 'Елена'];
var shadowBlock = document.createDocumentFragment();
var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var targetContentBlock = document.querySelector('.pictures');

createElementPhoto(arrayObjects);

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
 * Функция генерирует объекты по шаблонам и помещает в целевой массив arrayObjects
 * @param {[]} targetArray передаем целевой массив в функцию для заполнения массива объектами. Свойство объекта comments
 * хранит в себе массив, который мы заполняем вторым циклом. В этом массиве хранятся объекты с информацией о комментаторах
 */
function createElementPhoto(targetArray) {
  for (var i = 0; i < COUNT_OBJECTS; i++) {
    targetArray.push({
      url: 'photos/' + +(i + 1) + '.jpg',
      description: 'description photo',
      likes: getRandomNumber(likesMin, likesMax),
      comments: []
    });
  }

  for (i = 0; i < targetArray.length; i++) {
    for (var y = 0; y < getRandomNumber(1, 10); y++) {
      targetArray[i].comments[y] = {
        avatar: 'img/avatar-' + getRandomNumber(1, 7) + '.svg',
        message: arrayMessage[getRandomNumber(1, arrayMessage.length)],
        name: arrayNames[getRandomNumber(1, arrayNames.length)]
      };
    }
  }
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

for (var i = 0; i < arrayObjects.length; i++) {
  shadowBlock.append(fillTemplate(arrayObjects[i]));
}

targetContentBlock.append(shadowBlock);
