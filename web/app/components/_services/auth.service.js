(function() {
  'use strict';

  function AuthService($rootScope, $state) {
    var service = {};

    service.isAuthed = function() {
      return service.statics.isAuthed;
    };

    service.manage = function() {
      $rootScope.$on('$stateChangeStart', function($event, toState, toParams, fromState, fromParams) {
        if (toState.requiresAuth && !service.isAuthed()) {
          $event.preventDefault();
          $state.transitionTo('login', { redirect: true });
        }
      })
    };

    service.statics = {
      isAuthed: true
    };

    return service;
  }

  angular.module('golfWithMe')
    .service('AuthService', AuthService)
    .run(function($rootScope, AuthService) {
      $rootScope.AUTH = AuthService.statics;
      AuthService.manage();
    });
})();
