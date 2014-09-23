(function() {
  'use strict';

  function MessageService(RestService, promiseCache, ModelService, AccountService) {
    var service = {};

    service.get = function(messageId) {
      return promiseCache({
        key: 'message_' + messageId,
        args: [messageId],
        ttl: 60*60*24*1000,
        localStorageEnabled: true,
        promise: function(messageId) {
          return RestService.get('message/' + messageId);
        }
      }).then(formatMessage);
    };

    function formatMessage(message) {
      message.user = ModelService.hydrate(AccountService.get, message.userId);
      return message;
    }

    return service;
  }

  angular.module('golfWithMe')
    .service('MessageService', MessageService)
})();
