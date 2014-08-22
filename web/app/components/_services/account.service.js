(function() {
  'use strict';

  function AccountService($q, Restangular, promiseCache) {
    var service = {};

    service.get = function(accountId) {
      return promiseCache({
        key: 'account_' + accountId,
        args: [accountId],
        promise: function(accountId) {
          return Restangular.one('account', accountId).get();
        }
      });
    };

    return service;
  }

  angular.module('golfWithMe')
    .service('AccountService', AccountService)
})();
