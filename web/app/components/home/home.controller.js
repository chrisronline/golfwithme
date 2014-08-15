(function() {
  'use strict';

  function HomeCtrl() {
    var homeCtrl = this;

    homeCtrl.foo = 'bar';
  }

  angular.module('golfWithMe')
    .controller('HomeCtrl', HomeCtrl);
})();
