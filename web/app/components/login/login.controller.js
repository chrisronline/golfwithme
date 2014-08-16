(function() {
  'use strict';

  function LoginConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'components/login/login.html'
      });
  }

  function LoginForm(LoginService) {
    return {
      validationRules: {
        email: { required: true },
        password: { required: true }
      },
      submit: function(data) {
        return LoginService.login(data);
      }
    };
  }

  function LoginCtrl($scope, LoginService) {
    var loginCtrl = this;

    loginCtrl.user = {};
    // loginCtrl.login = function() {
    //   LoginService.login().then(
    //     function() {
    //       console.log(1);
    //     },
    //     function() {
    //       console.log(2);
    //     }
    //   )
    // };
  }

  angular.module('golfWithMe')
    .config(LoginConfig)
    .factory('LoginForm', LoginForm)
    .controller('LoginCtrl', LoginCtrl);
})();
