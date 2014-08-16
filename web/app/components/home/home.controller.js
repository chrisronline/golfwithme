(function() {
  'use strict';

  function HomeConfig($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'components/home/home.html',
      });
  }

  function HomeCtrl() {
    var homeCtrl = this;

    homeCtrl.foo = 'bar';
  }

  angular.module('golfWithMe')
    .config(HomeConfig)
    .controller('HomeCtrl', HomeCtrl);
})();
