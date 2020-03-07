'use strict';

//var COUNT_OBJECTS = 25;
//var LIKES_MIN = 15;
//var LIKES_MAX = 200;
//var ARRAY_MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
//var ARRAY_NAMES = ['Артём', 'Вадим', 'Пётр', 'Ксения', 'Анна', 'Мария', 'Дмитрий', 'Игорь', 'Михаил', 'Ольга', 'Кристина', 'Елена'];
var MIN_PHOTO_SIZE_PERCENT = 25;
var MAX_PHOTO_SIZE_PERCENT = 100;
var STEP_PHOTO_RESIZE_PERCENT = 25;
var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAG_LENGTH = 20;
var MAX_COUNT_HASHTAGS = 5;
var DEFAULT_INTENSIVITY = 100;

//var arrayObjects = [];
//var shadowBlock = document.createDocumentFragment();
//var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
//var targetContentBlock = document.querySelector('.pictures');
var siteBody = document.querySelector('body');
//var bigPictureBlock = document.querySelector('.big-picture');
//var bigPictureImage = document.querySelector('.big-picture__img').querySelector('img');
//var bigPictureLikes = document.querySelector('.likes-count');
//var bigPictureCountComments = document.querySelector('.comments-count');
//var bigPictureListComments = document.querySelector('.social__comments');
//var bigPictureDescription = document.querySelector('.social__caption');
//var bigPictureCommentCounter = document.querySelector('.social__comment-count');
//var bigPictureCommentsLoader = document.querySelector('.comments-loader');

//var editorPhoto = document.querySelector('.img-upload__overlay');
//var editorPhotoForm = document.querySelector('.img-upload__form');
var photoEffectsList = document.querySelector('.effects__list');
var photoOriginalEffect = document.querySelector('#effect-none');
var intensivityScaleWrapper = document.querySelector('.img-upload__effect-level');
var photoUploaded = document.querySelector('.img-upload__preview').querySelector('img');
var resizePhotoWrapper = document.querySelector('.img-upload__scale');
var resizePhotoInputArea = document.querySelector('.scale__control--value');
var resizePhotoToSmall = document.querySelector('.scale__control--smaller');
var resizePhotoToBig = document.querySelector('.scale__control--bigger');
var hashtagsInputArea = document.querySelector('.text__hashtags');
//var commentsInputArea = document.querySelector('.text__description');
var pinOnScale = document.querySelector('.effect-level__pin');
var elementIntensivityScale = document.querySelector('.effect-level__line');
var intensivityEffectInput = document.querySelector('.effect-level__value');
var activeFilter = photoOriginalEffect.value;
var percentIntensivity = DEFAULT_INTENSIVITY;










//hashtagsInputArea.addEventListener('input', onHashtagsInput);

