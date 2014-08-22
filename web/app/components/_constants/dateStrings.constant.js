(function() {
  'use strict';

  var dateStrings = {
    ISO: 'YYYY-MM-DDTHH:mm:ssZ'
  };

  angular.module('golfWithMe')
    .constant('dateStrings', dateStrings);
})();
