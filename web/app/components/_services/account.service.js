(function() {
  'use strict';

  function AccountService($q, RestService, promiseCache) {
    var service = {};

    service.get = function(accountId) {
      return promiseCache({
        key: 'account_' + accountId,
        args: [accountId],
        ttl: 60*60*24*1000,
        localStorageEnabled: true,
        promise: function(accountId) {
          return RestService.get('account/' + accountId)
            .then(service.formatAccount);
        }
      });
    };

    service.formatAccount = function(account) {
      account._displayName = account.firstName + ' ' + account.lastName;
      return account;
    };

    return service;
  }

  angular.module('golfWithMe')
    .service('AccountService', AccountService)
})();
