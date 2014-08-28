(function() {
  'use strict';

  function GoogleService($q) {
    var service = {};
    var geocoder = new google.maps.Geocoder();

    service.lookupCity = function(city) {
      var deferred = $q.defer();
      geocoder.geocode({address: city}, function(results, status) {
        deferred.resolve({
          results: results,
          status: status
        })
      });
      return deferred.promise;
    };

    return service;
  }

  angular.module('golfWithMe')
    .factory('GoogleService', GoogleService);
})();
