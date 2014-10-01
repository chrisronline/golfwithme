(function() {
  'use strict';

  function RestService($q, $http) {
    var service = {};
    var baseUrl = 'http://localhost:3000/api/';

    function request(url, method, data) {
      var fullUrl = baseUrl + url;
      return $http({
          url: fullUrl,
          dataType: 'json',
          method: method,
          data: data || {}
        })
        .then(function(success) {
          return success.data;
        })
        .catch(function(error) {
          console.warn(error);
          return $q.reject(error);
        });
    }

    service.get = function(url) {
      return request(url, 'GET');
    };

    service.post = function(url, data) {
      return request(url, 'POST', data);
    };

    service.put = function(url, data) {
      return request(url, 'PUT', data);
    };

    service.del = function(url) {
      return request(url, 'DELETE');
    };

    return service;
  }

  angular.module('golfWithMe')
    .factory('RestService', RestService);
})();
