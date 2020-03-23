'use strict';

// получение данных с сервера
(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT = window.utility.TIMEOUT;
  var TYPE = 'json';
  var ERROR_CODE = 400;

  function download(onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError(xhr.status);
    });

    xhr.responseType = TYPE;
    xhr.timeout = TIMEOUT;
    xhr.open('GET', URL);
    xhr.send();
  }

  function responseOk(responseServer) {
    window.collectionPhoto.render(responseServer);
    window.collectionPhoto.showFilter();
  }

  function responseError(code) {
    switch (code) {
      case code >= ERROR_CODE:
        errorMessage(code);
        break;

      default:
        return;
    }
  }

  function errorMessage(code) {
    var newDiv = document.createElement('div');
    newDiv.style.position = 'absolute';
    newDiv.style.width = '100%';
    newDiv.style.backgroundColor = 'red';
    newDiv.textContent = 'Ошибка при загрузке! Код: ' + code;
    newDiv.style.textAlign = 'center';
    newDiv.style.color = 'white';
    window.utility.getBodySite.prepend(newDiv);

    document.addEventListener('click', function () {
      newDiv.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utility.KEY_ESC) {
        newDiv.remove();
      }
    });
  }

  download(responseOk, responseError);
})();
