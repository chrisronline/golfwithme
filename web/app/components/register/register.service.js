(function() {
  'use strict';

  angular.module('golfWithMe')
    .factory('RegisterService', function($q, RestService) {
      var service = {};

      service.register = function(data) {
        return RestService.post('auth', {user: data});
      };

      return service;
    })
})();
