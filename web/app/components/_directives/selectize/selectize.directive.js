(function() {
  'use strict';

  function SelectizeDirective($timeout) {
    return {
      restrict: 'EA',
      require: 'ngModel',
      scope: {
        options: '=?',
        control: '=?'
      },
      link: function($scope, $element, $attrs, $ctrl) {
        var timeout;
        function refresh() {
          $timeout.cancel(timeout);
          timeout = $timeout(function() {
            $scope.control.addItem($ctrl.$modelValue);
          });
        }
        $scope.control = $element.selectize($scope.options)[0].selectize;
        $scope.$watch(function() { return $ctrl.$modelValue }, refresh);
      }
    };
  }

  angular.module('golfWithMe')
    .directive('selectize', SelectizeDirective);
})();
