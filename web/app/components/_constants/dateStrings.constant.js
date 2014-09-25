(function() {
  'use strict';

  var dateStrings = {
    DATE_ISO: 'YYYY-MM-DDTHH:mm:ssZ',
    DATE_WIRE: 'YYYY-MM-DD',
    DATE_SHORTHAND: 'MM/DD/YYYY',
    DATE_LONG: 'dddd, MMMM Do YYYY',
    DATE_CONTROL: 'YYYY-MM-DD',
    DATE_AND_TIME: 'MM/DD/YYYY h:mm a',
    TIME_SHORTHAND: 'h:mm a',
    TIME_CONTROL: 'HH:mm'
  };

  angular.module('golfWithMe')
    .constant('DATE_STRINGS', dateStrings);
})();
