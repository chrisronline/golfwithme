(function() {
  'use strict';

  function RestService($q, $http) {
    var service = {};
    var baseUrl = 'http://localhost:3001/api/v1/';

    function request(url, method, data) {
      var fullUrl = baseUrl + url;
      return $http({
          url: fullUrl,
          dataType: 'json',
          method: method,
          data: data || {}
        })
        .then(function(success) {
          // console.log(success);
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
    .factory('RestService', RestService)
    .config(function(RestangularProvider) {
      RestangularProvider.setBaseUrl('http://localhost:3001/api/v1/');
      RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        // Handle response transformer here
        return data;
      });
    })
    .run(function(Restangular) {
      Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
        // Handle errors here
      });
    });
})();
