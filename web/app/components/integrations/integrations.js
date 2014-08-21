(function() {
  'use strict';

  function Integrations($authProvider) {
    $authProvider.facebook({
      clientId: '1486132068300432',
      url: 'http://localhost:3001/auth/facebook'
    });

    /*
    var config = {
      logoutRedirect: '/',
      loginRedirect: '/',
      loginUrl: '/auth/login',
      signupUrl: '/auth/signup',
      signupRedirect: '/login',
      loginRoute: '/login',
      signupRoute: '/signup',
      user: 'currentUser'
    };*/
    $authProvider.config.loginUrl = 'http://localhost:3001/auth/login';
    $authProvider.config.signupUrl = 'http://localhost:3001/auth/register';
    // $authProvider.config.loginUrl = 'http://localhost:3001/auth/login';
    // $authProvider.config.loginUrl = 'http://localhost:3001/auth/login';
    // $authProvider.config.loginUrl = 'http://localhost:3001/auth/login';
    // $authProvider.config.loginUrl = 'http://localhost:3001/auth/login';
    // $authProvider.config.loginUrl = 'http://localhost:3001/auth/login';
  }

  angular.module('golfWithMe')
    .config(Integrations);
})();
