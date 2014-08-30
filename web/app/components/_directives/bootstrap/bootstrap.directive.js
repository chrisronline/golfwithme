(function() {
  'use strict';

  function ToggleDirective($interpolate) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $element.tooltip({
          title: $interpolate($attrs.title)($scope)
        });
      }
    };
  }

  angular.module('golfWithMe')
    .directive('toggle', ToggleDirective);
})();
