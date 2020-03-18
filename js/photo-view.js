'use strict';

// collection element-photo view
(function () {
  var bigPictureBlock = document.querySelector('.big-picture');
  var bigPictureImage = document.querySelector('.big-picture__img').querySelector('img');
  var bigPictureLikes = document.querySelector('.likes-count');
  var bigPictureCountComments = document.querySelector('.comments-count');
  var bigPictureListComments = document.querySelector('.social__comments');
  var bigPictureDescription = document.querySelector('.social__caption');
  var bigPictureCommentCounter = document.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = document.querySelector('.comments-loader');
  var picturesCollection = document.querySelector('.pictures');
  var startCommentQuota = 5;
  var stepCommentQuota = 5;
  var commentQuota = startCommentQuota;
  var clickOnElement = null;

  /**
   * Функция скрывает/показывает элемент big-picture в разметке
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
    description.textContent = contentObject.description;
    getComment(listComments, contentObject);
  }

  /**
   * Функция сначала очищает список комментариев а потом рендерит элементы в разметке, в списке комментариев
   * @param {*} listComments целевой элемент-список с комментариями
   * @param {Object} contentObject целевой объект передаваемый в функцию, из которого будут браться значения его свойств
   */
  function getComment(listComments, contentObject) {
    // очищаем список от дочерних элементов имеющихся по умолчанию
    while (listComments.firstChild) {
      listComments.removeChild(listComments.firstChild);
    }

    for (var i = 0; i < contentObject.comments.length; i++) {
      // если выгружены еще не все комментарии, и кнопка по каким либо причинам скрыта - показать её
      if (i < contentObject.comments.length && bigPictureCommentsLoader.classList.contains('hidden') === true) {
        bigPictureCommentsLoader.classList.toggle('hidden');
      }

      // если количество комментариев в общем совпадает с количеством выгруженных, то кнопку о доп. загрузке комментов скрываем
      if (i === contentObject.comments.length - 1) {
        bigPictureCommentsLoader.classList.toggle('hidden');
      }

      // если индекс перечисления === выделенной квоте комментариев, то больше не генерируем комментариев
      if (i === commentQuota) {
        return;
      }

      // рендерим комментарий
      listComments.insertAdjacentHTML('beforeend', '<li class="social__comment"><img class="social__picture" src="' + contentObject.comments[i].avatar + '" alt="' + contentObject.comments[i].name + '" width="35" height="35"><p class="social__text">' + contentObject.comments[i].message + '</p></li>');
    }
  }

  picturesCollection.addEventListener('click', function (evt) {
    if (evt.target.matches('.picture__img') === true) {
      commentQuota = startCommentQuota;
    } else {
      return;
    }

    window.collectionPhoto.arr.forEach(function (dataObject) {
      if (dataObject.url === evt.target.getAttribute('src')) {
        clickOnElement = dataObject;
      }
    });

    showOrHideBigPicture(bigPictureCommentCounter, bigPictureCommentsLoader, bigPictureBlock, window.utility.body);
    renderBigPicture(bigPictureImage, bigPictureLikes, bigPictureCountComments, bigPictureListComments, bigPictureDescription, clickOnElement);
  });

  bigPictureCommentsLoader.addEventListener('click', function () {
    commentQuota = commentQuota + stepCommentQuota;
    renderBigPicture(bigPictureImage, bigPictureLikes, bigPictureCountComments, bigPictureListComments, bigPictureDescription, clickOnElement);
  });
})();
