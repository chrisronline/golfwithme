(function() {
  'use strict';

  angular.module('golfWithMe', [
    'ui.router',
    'restangular',
    'formFor',
    'Satellizer',
    'angular-ladda',
    'ui.bootstrap',
    'angular-promise-cache'])

    .config(function($urlRouterProvider) {
      $urlRouterProvider.when('', '/');
    });
})();
