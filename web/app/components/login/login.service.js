(function() {
  'use strict';

  angular.module('golfWithMe')
    .factory('LoginService', function(RestService, AuthService) {
      var service = {};

      service.login = function(email, password) {
        return RestService.post('auth/sign_in', { user: { email: email, password: password } })
          .then(AuthService.handleLogin);
      };

      service.logout = function() {
        return RestService.del('auth/sign_out')
          .then(AuthService.handleLogout);
      };

      return service;
    })
})();
