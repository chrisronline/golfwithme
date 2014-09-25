(function() {
  'use strict';

  function OutingRequestsCtrl($scope) {
    var requestsCtrl = this;
    var outingCtrl = $scope.outingCtrl;
  }

  angular.module('golfWithMe')
    .controller('OutingRequestsCtrl', OutingRequestsCtrl);
})();
