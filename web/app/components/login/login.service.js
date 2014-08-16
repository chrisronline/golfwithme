(function() {
  'use strict';

  angular.module('golfWithMe')
    .factory('LoginService', function(Restangular) {
      var service = {};
      var base = Restangular.all('auth/login');

      service.login = function(email, password) {
        return base.post({ email: email, password: password });
      };

      return service;
    })
})();
