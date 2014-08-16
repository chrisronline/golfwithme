(function() {
  'use strict';

  angular.module('golfWithMe')
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
