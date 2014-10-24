(function() {
  'use strict';

  angular.module('golfWithMe', [
    'ui.router',
    'Satellizer',
    'angular-ladda',
    'ui.bootstrap',
    'angular-promise-cache',
    'angular-float-labels',
    'ngTable',
    'angular-data.DSCacheFactory',
    'angular-data.DS'])

    .config(function($urlRouterProvider, DSCacheFactoryProvider) {
      $urlRouterProvider.when('', '/');
      DSCacheFactoryProvider.setCacheDefaults({
        storageMode: 'localStorage',
        storagePrefix: 'gwm:'
      });
    })
    .run(function($rootScope) {
      // $rootScope.$on('$stateChangeStart', function() { console.log('$stateChangeStart', arguments); });
      $rootScope.$on('$stateChangeError', function() { console.warn('$stateChangeError', arguments); });
      // $rootScope.$on('$stateChangeStart', function() { console.log('$stateChangeStart', arguments); });
      // $rootScope.$on('$stateChangeStart', function() { console.log('$stateChangeStart', arguments); });
    })
})();
