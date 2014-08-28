(function() {
  'use strict';

  function SelectizeDirective() {
    return {
      restrict: 'EA',
      scope: {
        options: '='
      },
      link: function($scope, $element, $attrs) {
        $element.selectize($scope.options);
      }
    };
  }

  angular.module('golfWithMe')
    .directive('selectize', SelectizeDirective);
})();
