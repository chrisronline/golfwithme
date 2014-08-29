(function() {
  'use strict';

  var dateStrings = {
    ISO: 'YYYY-MM-DDTHH:mm:ssZ',
    WIRE: 'YYYY-MM-DD'
  };

  angular.module('golfWithMe')
    .constant('DATE_STRINGS', dateStrings);
})();
