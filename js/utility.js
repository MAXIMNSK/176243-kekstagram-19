'use strict';

// utility
(function () {
  var siteBody = document.querySelector('body');
  var photoUploaded = document.querySelector('.img-upload__preview').querySelector('img');

  window.utility = {
    body: siteBody,
    uploadedPhoto: photoUploaded,
  };
})();
