(function() {
  'use strict';

  function LoginCtrl($scope) {
    var loginCtrl = this;

    console.log('hi');
  }

  angular.module('golfWithMe')
    .controller('LoginCtrl', LoginCtrl);
})();
