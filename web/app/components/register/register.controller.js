(function() {
  'use strict';

  _.mixin({
    safeAccess: function(obj, exp) {
      var parts = exp.split('.');
      while (parts.length) {
        var sub = parts.shift();
        if (_.has(obj, sub)) {
          obj = obj[sub];
        }
        else {
          return undefined;
        }
      }
      return obj;
    }
  });

  function RegisterConfig($stateProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'components/register/register.html'
      });
  }

  function RegisterCtrl($scope, $auth, $log, RegisterService) {
    var registerCtrl = this;

    registerCtrl.user = {};
    registerCtrl.waiting = false;

    registerCtrl.register = function() {
      RegisterService.register(registerCtrl.user)
        .then(function(success) {
          console.log('yay');
        })
        .catch(function(error) {
          registerCtrl.errors = _.safeAccess(error, 'data.errors');
        });
    };
    registerCtrl.authenticate = function(provider) {
      registerCtrl.waiting = true;
      $auth.authenticate(provider).then(
        function() {
          $log.debug('success');
        },
        function() {
          $log.debug('error');
        }
      ).finally(
        function() {
          registerCtrl.waiting = false;
        }
      )
    };
  }

  angular.module('golfWithMe')
    .config(RegisterConfig)
    .controller('RegisterCtrl', RegisterCtrl);
})();
