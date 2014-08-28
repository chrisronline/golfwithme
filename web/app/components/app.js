(function() {
  'use strict';

  angular.module('golfWithMe', [
    'ui.router',
    'restangular',
    'Satellizer',
    'angular-ladda',
    'ui.bootstrap',
    'angular-promise-cache',
    'angular-float-labels'])

    .config(function($urlRouterProvider) {
      $urlRouterProvider.when('', '/');
    });
})();
