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
    loginCtrl.login = function() {
      LoginService.login(loginCtrl.user.email, loginCtrl.user.password, loginCtrl.user.remember)
        .then(function() {
          console.log('success!');
        });
    };
    loginCtrl.redirect = $stateParams.redirect;
  }

  angular.module('golfWithMe')
    .config(LoginConfig)
    .controller('LoginCtrl', LoginCtrl);
})();
