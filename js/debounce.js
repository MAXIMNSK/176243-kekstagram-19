'use strict';

(function () {
  var INTERVAL = 500;
  var lastTimeout;

  /**
   * Функция "устранения дребезга" / dobounce func. Интервал срабатывает только спустя 0.5 секунды "молчания"
   * @param {*} callBack функция которой задаётся интервал
   */
  function debounceFunc(callBack) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(callBack, INTERVAL);
  }

  window.debounce = {
    func: debounceFunc,
  };
})();
