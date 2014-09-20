(function() {
  'use strict';

  var dateStrings = {
    ISO: 'YYYY-MM-DDTHH:mm:ssZ',
    WIRE: 'YYYY-MM-DD',
    SHORTHAND: 'MM/DD/YYYY'
  };

  var timeStrings = {
    SHORTHAND: 'h:mm a'
  };

  angular.module('golfWithMe')
    .constant('TIME_STRINGS', timeStrings)
    .constant('DATE_STRINGS', dateStrings);
})();
