'use strict';

// получение данных с сервера
(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT = 5000;
  var TYPE = 'json';

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
  }

  function responseError() {
    // error code
  }

  download(responseOk, responseError);
})();
