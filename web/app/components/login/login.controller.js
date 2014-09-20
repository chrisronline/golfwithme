(function() {
  'use strict';

  function LoginConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login?redirect',
        templateUrl: 'components/login/login.html'
      });
  }

  function LoginCtrl($scope, LoginService, $stateParams) {
    var loginCtrl = this;

    loginCtrl.user = {};
    loginCtrl.redirect = $stateParams.redirect;
  }

  angular.module('golfWithMe')
    .config(LoginConfig)
    .controller('LoginCtrl', LoginCtrl);
})();
