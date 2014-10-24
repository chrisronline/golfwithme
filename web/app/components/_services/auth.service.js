(function() {
  'use strict';

  function AuthService(DSCacheFactory, RestService, $rootScope, $state) {
    var service = {};
    var dsCache = DSCacheFactory.createCache('auth');

    function handleLogin(response) {
      service.statics.context = response;
      service.statics.isAuthed = true;
      return response;
    }

    function cacheLogin(response) {
      dsCache.put('auth', response);
    }

    function handleLogout(response) {
      service.statics.context = null;
      service.statics.isAuthed = false;
      dsCache.remove('auth');
      $state.transitionTo('home');
    }

    service.isAuthed = function() {
      return service.statics.isAuthed;
    };

    service.login = function(email, password) {
      return RestService.post('auth/sign_in', { user: { email: email, password: password } })
        .then(handleLogin)
        .then(cacheLogin);
    };

    service.logout = function() {
      return RestService.del('auth/sign_out')
        // todo: once this works, change this to only happen on success
        .finally(handleLogout);
    };

    service.check = function() {
      var data = dsCache.get('auth');
      if (data && data.auth_token && data.email) {
        handleLogin(data);
      }
    };

    service.manage = function() {
      $rootScope.$on('$stateChangeStart', function($event, toState, toParams, fromState, fromParams) {
        if (toState.requiresAuth && !service.isAuthed()) {
          $event.preventDefault();
          $state.transitionTo('login', { redirect: true });
        }
        else if (!toState.requiresAuth && service.isAuthed() && toState.name !== 'logout') {
          $event.preventDefault();
          $state.transitionTo('dashboard');
        }
      });
      service.check();
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
