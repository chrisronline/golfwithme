(function() {
  'use strict';

  function PostNowController($scope) {
    var ctrl = this;
  }

  function PostNowDirective() {
    return {
      restrict: 'EA',
      templateUrl: 'components/dashboard/postNow/postNow.directive.html'
    };
  }

  angular.module('golfWithMe')
    .controller('PostNowController', PostNowController)
    .directive('postNow', PostNowDirective);
})();
