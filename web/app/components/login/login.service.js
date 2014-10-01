(function() {
  'use strict';

  angular.module('golfWithMe')
    .factory('LoginService', function(RestService) {
      var service = {};

      service.login = function(email, password) {
        return RestService.post('users/sign_in', { email: email, password: password });
      };

      return service;
    })
})();
