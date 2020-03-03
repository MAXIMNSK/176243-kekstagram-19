'use strict';

var COUNT_OBJECTS = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var ARRAY_MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var ARRAY_NAMES = ['Артём', 'Вадим', 'Пётр', 'Ксения', 'Анна', 'Мария', 'Дмитрий', 'Игорь', 'Михаил', 'Ольга', 'Кристина', 'Елена'];
var MIN_PHOTO_SIZE_PERCENT = 25;
var MAX_PHOTO_SIZE_PERCENT = 100;
var STEP_PHOTO_RESIZE_PERCENT = 25;
var BTN_ESC_CODE = 27;
var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAG_LENGTH = 20;
var MAX_COUNT_HASHTAGS = 5;
var DEFAULT_INTENSIVITY = 100;

var arrayObjects = [];
var shadowBlock = document.createDocumentFragment();
var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var targetContentBlock = document.querySelector('.pictures');
var siteBody = document.querySelector('body');
var bigPictureBlock = document.querySelector('.big-picture');
var bigPictureCloser = document.querySelector('.big-picture__cancel');
var bigPictureImage = bigPictureBlock.querySelector('.big-picture__img').querySelector('img');
var bigPictureLikes = bigPictureBlock.querySelector('.likes-count');
var bigPictureCountComments = bigPictureBlock.querySelector('.comments-count');
var bigPictureListComments = bigPictureBlock.querySelector('.social__comments');
var bigPictureDescription = bigPictureBlock.querySelector('.social__caption');
var bigPictureCommentCounter = bigPictureBlock.querySelector('.social__comment-count');
var bigPictureCommentsLoader = bigPictureBlock.querySelector('.comments-loader');

var uploaderPhoto = document.querySelector('#upload-file');
var editorPhoto = document.querySelector('.img-upload__overlay');
var editorPhotoForm = document.querySelector('.img-upload__form');
var editorPhotoCloser = document.querySelector('.img-upload__cancel');
var photoEffectsList = document.querySelector('.effects__list');
var photoOriginalEffect = document.querySelector('#effect-none');
var intensivityScaleWrapper = document.querySelector('.img-upload__effect-level');
var photoUploaded = document.querySelector('.img-upload__preview').querySelector('img');
var resizePhotoWrapper = document.querySelector('.img-upload__scale');
var resizePhotoInputArea = document.querySelector('.scale__control--value');
var resizePhotoToSmall = document.querySelector('.scale__control--smaller');
var resizePhotoToBig = document.querySelector('.scale__control--bigger');
var hashtagsInputArea = document.querySelector('.text__hashtags');
var commentsInputArea = document.querySelector('.text__description');
var pinOnScale = document.querySelector('.effect-level__pin');
var elementIntensivityScale = document.querySelector('.effect-level__line');
var intensivityEffectInput = document.querySelector('.effect-level__value');
var activeFilter = photoOriginalEffect.value;
var persentOfIntensivity = DEFAULT_INTENSIVITY;
var objFilters = {
  none: function () {
    return 'none';
  },
  chrome: function () {
    return 'grayscale(' + (1 / 100) * persentOfIntensivity + ')';
  },
  sepia: function () {
    return 'sepia(' + (1 / 100) * persentOfIntensivity + ')';
  },
  marvin: function () {
    return 'invert(' + 1 * persentOfIntensivity + '%)';
  },
  phobos: function () {
    return 'blur(' + (3 / 100) * persentOfIntensivity + 'px)';
  },
  heat: function () {
    return 'brightness(' + ((3 - 1) / 100) * persentOfIntensivity + 1 + ')';
  },
};

/**
 * Функция-обработчик добавляет/удаляет класс modal-open для тега body и показывает редактор фотографии при изменении статуса photo uploader
 */
function onUploaderFileChange() {
  if (siteBody.classList.contains('modal-open') === false) {
    siteBody.classList.toggle('modal-open');
  }

  if (editorPhoto.classList.contains('hidden') === true) {
    editorPhoto.classList.toggle('hidden');
  }
}

/**
 * Функция-обработчик вызываемая при клике на кнопку закрытия модального окна
 * @param {*} evt событие передаваемое в функцию по умолчанию JSом
 */
function onCloseBtnClick(evt) {
  if (evt.target === bigPictureCloser) {
    bigPictureBlock.classList.toggle('hidden');
    siteBody.classList.toggle('modal-open');
  }

  if (evt.target === editorPhotoCloser) {
    editorPhoto.classList.toggle('hidden');
    siteBody.classList.toggle('modal-open');
    editorPhotoForm.reset();
  }
}

/**
 * Функция-обработчик закрывает при нажатии на Esc модальные окна big-picture или img-upload__overlay. Если же в фокусе находится область ввода хештега или область ввода комментариев то модальное окно не закрывается.
 * @param {*} evt событие передаваемое в функцию по умолчанию JSом
 */
function onPressEscKeydown(evt) {
  var successToClose;

  if (evt.keyCode === BTN_ESC_CODE && bigPictureBlock.classList.contains('hidden') === false) {
    bigPictureBlock.classList.toggle('hidden');
    siteBody.classList.toggle('modal-open');
  }

  if (document.activeElement === hashtagsInputArea || document.activeElement === commentsInputArea) {
    successToClose = false;
  } else {
    successToClose = true;
  }

  if (evt.keyCode === BTN_ESC_CODE && editorPhoto.classList.contains('hidden') === false && successToClose === true) {
    editorPhoto.classList.toggle('hidden');
    siteBody.classList.toggle('modal-open');
    editorPhotoForm.reset();
  }
}

/**
 * Функция-обработчик вызываемая при клике на список фото-эффектов. При нажатии на фильтр, картинке передаётся класс из value фильтра. При клике на original filter - шкала скрывается, в случае если нажали не на original и шкала скрыта - шкалу интенсивности показываем. Так же выгружаем значение активного фильтра строкой в переменную activeFilter. И при смене фильтра задаём % интенсивности по умолчанию === DEFAULT_INTENSIVITY. После чего обращаемся к функции для обновления значений у целевого элемента.
 * @param {*} evt событие передаваемое в функцию по умолчанию JSом
 */
function onEffectClick(evt) {
  if (evt.target.matches('input[type="radio"]') === true) {
    photoUploaded.className = '';
    photoUploaded.classList.add('effects__preview--' + evt.target.value);

    activeFilter = evt.target.value;
    persentOfIntensivity = DEFAULT_INTENSIVITY;
  }

  if (evt.target.matches('input[type="radio"]') === true && evt.target === photoOriginalEffect) {
    intensivityScaleWrapper.classList.toggle('hidden');
  }

  if (evt.target.matches('input[type="radio"]') === true && evt.target !== photoOriginalEffect && intensivityScaleWrapper.classList.contains('hidden') === true) {
    intensivityScaleWrapper.classList.toggle('hidden');
  }

  onInputIntensivityInput(activeFilter);
}

/**
 * Функция-обработчик определяет положение тумблера на шкале, и обновляет значение переменной persentOfIntensivity на актуальное. Так же актуальное значение передаём в требуемый по ТЗ инпут. Обращаемся к функции для обновления параметров целевого изображения.
 */
function onPinMouseUp() {
  var totalWidthScale = elementIntensivityScale.offsetWidth;
  persentOfIntensivity = Math.round(pinOnScale.offsetLeft / (totalWidthScale / 100));
  intensivityEffectInput.value = persentOfIntensivity;

  onInputIntensivityInput(activeFilter);
}

/**
 * Функция получает имя активного фильтра и проверяет по ветвлению, когда соответствие найдено, то для фотографии обновляем фильтр задавая новый стиль (данные берем из объекта с фильтрами)
 * @param {string} currentFilter имя передаваемого активного фильтра
 */
function onInputIntensivityInput(currentFilter) {
  if (currentFilter === 'chrome') {
    photoUploaded.style.filter = objFilters.chrome();
  } else if (currentFilter === 'sepia') {
    photoUploaded.style.filter = objFilters.sepia();
  } else if (currentFilter === 'marvin') {
    photoUploaded.style.filter = objFilters.marvin();
  } else if (currentFilter === 'phobos') {
    photoUploaded.style.filter = objFilters.phobos();
  } else if (currentFilter === 'heat') {
    photoUploaded.style.filter = objFilters.heat();
  } else {
    photoUploaded.style.filter = objFilters.none();
  }
}

/**
 * Функция-обработчик вызываемая при клике на элемент изменяющий и отображающий размер загруженной фотографии. Если была нажата кнопка + то фото увеличивается на 25%, если на - то уменьшается на 25 (но не меньше 25 и не больше 100).
 * @param {*} evt событие передаваемое в функцию по умолчанию JSом
 */
function onBtnResize(evt) {
  var temp = +resizePhotoInputArea.value.slice(0, resizePhotoInputArea.value.length - 1);

  if (evt.target === resizePhotoToSmall) {
    if (temp > MIN_PHOTO_SIZE_PERCENT) {
      resizePhotoInputArea.value = temp - STEP_PHOTO_RESIZE_PERCENT + '%';
    }
  }

  if (evt.target === resizePhotoToBig) {
    if (temp < MAX_PHOTO_SIZE_PERCENT) {
      resizePhotoInputArea.value = temp + STEP_PHOTO_RESIZE_PERCENT + '%';
    }
  }

  // обновляем значение temp после изменения value в ветвлениях
  temp = +resizePhotoInputArea.value.slice(0, resizePhotoInputArea.value.length - 1);

  photoUploaded.style.transform = 'scale(' + (temp / 100) + ')';
}

/**
 * Функция получает хештеги из соответствующего поля ввода, и проверяет каждый хештег на соответствие критериям (прогоняя входные данные через цикл forEach)
 */
function onHashtagsInput() {
  var inputData = hashtagsInputArea.value.split(' ');
  inputData.forEach(checkHashtags);
}

/**
 * Функция проверяет входные данные по критериям
 * @param {string} element передаём в функцию содержимое обрабатываемого индекса массива
 * @param {number} index передаём в функцию индекс обрабатываемого элемента
 * @param {[]} array передаём в функцию целевой массив
 * @return {boolean} возвращает false в случае провала проверки
 */
function checkHashtags(element, index, array) {
  var incorrectSymbolsString = '!@$%^&*()_+"№;:?-=,.';
  var incorrectSymbolsArray = incorrectSymbolsString.split('');
  var notFound = -1;

  // проверка не не корректные символы
  for (var i = 0; i < incorrectSymbolsArray.length; i++) {
    if (element.indexOf(incorrectSymbolsArray[i]) !== notFound) {
      hashtagsInputArea.setCustomValidity(incorrectSymbolsArray[i] + ' некорректный символ в хештеге');
      return false;
    } else {
      hashtagsInputArea.setCustomValidity('');
    }
  }

  // начинается ли индекс с решетки
  if (element[0] !== '#') {
    hashtagsInputArea.setCustomValidity('Хештег должен начинаться с #');
    return false;
  } else {
    hashtagsInputArea.setCustomValidity('');
  }

  // минимальная и максимальная длина хештега
  if (element.length < MIN_HASHTAG_LENGTH || element.length > MAX_HASHTAG_LENGTH) {
    hashtagsInputArea.setCustomValidity('Длина хештега должна быть от 2 до 20 символов (включая спецсимвол - #)');
    return false;
  } else {
    hashtagsInputArea.setCustomValidity('');
  }

  // максимальное количество хештегов
  if (array.length > MAX_COUNT_HASHTAGS) {
    hashtagsInputArea.setCustomValidity('Количество хештегов не должно превышать 5');
    return false;
  } else {
    hashtagsInputArea.setCustomValidity('');
  }

  // проверка на дублирующиеся хештеги
  for (i = 0; i < array.length; i++) {
    for (var y = 0; y < array.length; y++) {
      if (i !== y && array[i].toLowerCase().includes(array[y].toLowerCase()) === true) {
        hashtagsInputArea.setCustomValidity('Уже имеется такой хештег');
        return false;
      } else {
        hashtagsInputArea.setCustomValidity('');
      }
    }
  }

  return true;
}

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

uploaderPhoto.addEventListener('change', onUploaderFileChange);
editorPhotoCloser.addEventListener('click', onCloseBtnClick);
document.addEventListener('keydown', onPressEscKeydown);
bigPictureCloser.addEventListener('click', onCloseBtnClick);
photoEffectsList.addEventListener('click', onEffectClick);
resizePhotoWrapper.addEventListener('click', onBtnResize);
hashtagsInputArea.addEventListener('input', onHashtagsInput);
pinOnScale.addEventListener('mouseup', onPinMouseUp);

// по умолчанию (при отрисовке страницы) скрываем шкалу интенсивности т.к. на старте выбран оригинальный фильтр
intensivityScaleWrapper.classList.add('hidden');
