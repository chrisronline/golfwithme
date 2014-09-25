(function() {
  'use strict';

  function OutingChatCtrl($scope) {
    var chatCtrl = this;
    var outingCtrl = $scope.outingCtrl;
  }

  angular.module('golfWithMe')
    .controller('OutingChatCtrl', OutingChatCtrl);
})();
