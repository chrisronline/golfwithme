(function() {
  'use strict';

  function HeaderDirective() {
    return {
      restrict: 'A',
      templateUrl: 'components/header/header.html'
    };
  }

  angular.module('golfWithMe')
    .directive('appHeader', HeaderDirective);
})();
