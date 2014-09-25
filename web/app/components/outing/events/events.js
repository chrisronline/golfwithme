(function() {
  'use strict';

  function OutingEventsCtrl($scope) {
    var eventsCtrl = this;
    var outingCtrl = $scope.outingCtrl;
  }

  angular.module('golfWithMe')
    .controller('OutingEventsCtrl', OutingEventsCtrl);
})();
