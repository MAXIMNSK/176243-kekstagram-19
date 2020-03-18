'use strict';

// utility
(function () {
  var siteBody = document.querySelector('body');
  var photoUploaded = document.querySelector('.img-upload__preview').querySelector('img');
  var BTN_ESC_CODE = 27;

  window.utility = {
    body: siteBody,
    uploadedPhoto: photoUploaded,
    keyEsc: BTN_ESC_CODE,
  };
})();
