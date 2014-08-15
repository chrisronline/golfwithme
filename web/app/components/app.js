(function() {
  'use strict';

  angular.module('golfWithMe', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'components/home/home.html',
        })
        .state('login', {
          url: '/login',
          templateUrl: 'components/login/login.html'
        });
      $urlRouterProvider.when('/', 'home');
    })
    .run(function($state) {
      $state.transitionTo('home');
    })
})();
