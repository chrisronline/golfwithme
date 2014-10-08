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

  function LogoutCtrl($state, LoginService) {
    LoginService.logout()
      .then(function() {
        $state.transitionTo('login');
      });
  }

  function LoginCtrl($scope, LoginService, $stateParams, $state) {
    var loginCtrl = this;

    loginCtrl.user = {};
    loginCtrl.login = function() {
      LoginService.login(loginCtrl.user.email, loginCtrl.user.password, loginCtrl.user.remember)
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
