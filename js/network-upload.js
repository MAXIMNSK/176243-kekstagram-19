'use strict';

// отправка данных на сервер
(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = window.utility.TIMEOUT;

  function upload(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError(xhr.status);
    });

    xhr.timeout = TIMEOUT;
    xhr.open('POST', URL);
    xhr.send(data);
  }

  window.networkUpload = {
    uploadToServer: upload,
  };
})();
