'use strict';

// получение данных с сервера
(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  function download(onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError(xhr.status);
    });

    xhr.responseType = 'json';
    xhr.timeout = 5000;
    xhr.open('GET', URL);
    xhr.send();
  }

  window.backend = {
    download: download,
  };
})();

(function () {
  var shadowBlock = document.createDocumentFragment();
  var targetContentBlock = document.querySelector('.pictures');
  var serverResponse = null;

  window.backend.download(responseOk, responseError);

  function responseOk(response) {
    serverResponse = response;

    for (var y = 0; y < response.length; y++) {
      shadowBlock.append(window.collectionPhoto.create(response[y]));
    }

    // перемещаем ранее сгенерированные элементы в шаблон, теперь в разметку
    targetContentBlock.append(shadowBlock);
  }

  function responseError(code) {
    switch(code) {
      case code >= 0 && code < 100:
        console.info(code);

      case code >= 100 && code < 200:
        console.info(code);
    }
  }

  window.backend = {
    serverResponse: serverResponse,
  };
})();
