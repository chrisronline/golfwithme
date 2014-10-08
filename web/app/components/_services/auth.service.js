(function() {
  'use strict';

  function AuthService($rootScope, $state) {
    var service = {};

    service.isAuthed = function() {
      return service.statics.isAuthed;
    };

    service.handleLogin = function(response) {
      service.statics.context = response;
      service.statics.isAuthed = true;
    };

    service.handleLogout = function() {
      service.statics.context = null;
      service.statics.isAuthed = false;
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
      isAuthed: false
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
