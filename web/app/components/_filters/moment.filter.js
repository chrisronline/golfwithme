(function() {
  'use strict';

  function momentFormatFilter(DATE_STRINGS) {
    // 1.3 will remove the need for this!
    var cache = {};

    function getFormats(momentObj) {
      return _.mapValues(_.clone(DATE_STRINGS), function(value) {
        return momentObj.format(value);
      });
    }

    return function(momentObj, format) {
      var key = momentObj.unix();
      if (!_.has(cache, key)) {
        cache[key] = getFormats(momentObj);
      }
      return cache[key][format];
    }
  }

  angular.module('golfWithMe')
    .filter('momentFormat', momentFormatFilter);
})();
