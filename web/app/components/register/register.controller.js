(function() {
  'use strict';

  function RegisterConfig($stateProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'components/register/register.html'
      });
  }

  function RegisterCtrl($scope) {
    var registerCtrl = this;

    registerCtrl.user = {};
  }

  function RegisterForm(RegisterService) {
    return {
      validationRules: {
        agreed: {
          required: {
            rule: true,
            message: 'You must accept the TOS'
          }
        },
        email: {
          required: true,
          pattern: /\w+@\w+\.\w+/
        },
        password: {
          required: true,
          pattern: {
            rule: /[0-9]/,
            message: 'Your password must contain at least 1 number'
          }
        }
      },
      submit: function(data) {
        return RegisterService.register(data);
      }
    };
  }

  angular.module('golfWithMe')
    .config(RegisterConfig)
    .factory('RegisterForm', RegisterForm)
    .controller('RegisterCtrl', RegisterCtrl);
})();
