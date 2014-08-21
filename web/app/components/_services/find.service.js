(function() {
  'use strict';

  function FindService(Restangular) {
    var service = {};
    var base = Restangular.all('find');

    service.find = function(data) {
      return base.post(data);
    };

    return service;
  }

  angular.module('golfWithMe')
    .factory('FindService', FindService);
})();
