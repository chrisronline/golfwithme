(function() {
  'use strict';

  angular.module('golfWithMe')
    .factory('RegisterService', function(Restangular) {
      var service = {};
      var base = Restangular.all('auth/register');

      service.register = function(data) {
        return base.post(data);
      };

      return service;
    })
})();
