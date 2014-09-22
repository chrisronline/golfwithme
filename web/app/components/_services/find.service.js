(function() {
  'use strict';

  function FindService($q, Restangular, RestService, AccountService) {
    var service = {};
    var base = Restangular.all('find');
    var geocoder = new google.maps.Geocoder();

    service.find = function(data) {
      return base.post(data)
        .then(function(response) {
          return response.data.matches;
        });
    };

    service.findPlayers = function(query) {
      return RestService.post('find/players', { query: query })
        .then(function(players) {
          return _.map(players, AccountService.formatAccount);
        })
    };

    service.findCity = function(city) {
      var deferred = $q.defer();
      geocoder.geocode({address: city}, function(results, status) {
        deferred.resolve({
          results: results,
          status: status
        })
      });
      return deferred.promise;
    };

    service.findUserCity = function() {
      var deferred = $q.defer();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          geocoder.geocode({ 'latLng': new google.maps.LatLng(position.coords.latitude, position.coords.longitude)},
            function(results, status) {
              // console.log(results);
              if (status == google.maps.GeocoderStatus.OK) {
                var city = _.find(results, function(result) {
                  // If this always the city? no idea...
                  if (_.contains(result.types, 'administrative_area_level_3')) {
                    return true;
                  }
                });
                deferred.resolve(city);
              }
              else {
                deferred.reject(status);
              }
            }
          );
        });
      }
      else {
        deferred.reject(false);
      }
      return deferred.promise;
    };

    return service;
  }

  angular.module('golfWithMe')
    .factory('FindService', FindService);
})();
