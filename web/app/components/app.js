(function() {
  'use strict';

  angular.module('golfWithMe', ['ui.router', 'restangular', 'formFor'])
    .config(function($urlRouterProvider) {
      $urlRouterProvider.when('', '/');
    });
})();
