(function() {
  'use strict';

  angular.module('golfWithMe', [
    'ui.router',
    'restangular',
    'Satellizer',
    'angular-ladda',
    'ui.bootstrap',
    'angular-promise-cache',
    'angular-float-labels',
    'ngTable'])

    .config(function($urlRouterProvider) {
      $urlRouterProvider.when('', '/');
    })
    .run(function($rootScope) {
      // $rootScope.$on('$stateChangeStart', function() { console.log('$stateChangeStart', arguments); });
      $rootScope.$on('$stateChangeError', function() { console.warn('$stateChangeError', arguments); });
      // $rootScope.$on('$stateChangeStart', function() { console.log('$stateChangeStart', arguments); });
      // $rootScope.$on('$stateChangeStart', function() { console.log('$stateChangeStart', arguments); });
    })
})();
