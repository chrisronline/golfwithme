(function() {
  'use strict';

  function LoginConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login?redirect',
        templateUrl: 'components/login/login.html'
      })
      .state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl'
      })
  }

  function LogoutCtrl($state, AuthService) {
    AuthService.logout()
      .then(function() {
        $state.transitionTo('login');
      });
  }

  function LoginCtrl($scope, AuthService, $stateParams, $state) {
    var loginCtrl = this;

    loginCtrl.user = {};
    loginCtrl.login = function() {
      AuthService.login(loginCtrl.user.email, loginCtrl.user.password, loginCtrl.user.remember)
        .then(function() {
          $state.transitionTo('dashboard');
        })
        .catch(function(error) {
          loginCtrl.error = error.data.message;
        });
    };
    loginCtrl.redirect = $stateParams.redirect;
  }

  angular.module('golfWithMe')
    .config(LoginConfig)
    .controller('LoginCtrl', LoginCtrl)
    .controller('LogoutCtrl', LogoutCtrl);
})();
