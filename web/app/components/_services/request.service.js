(function() {
  'use strict';

  function RequestService(RestService, promiseCache, ModelService, AccountService) {
    var service = {};

    service.getOutbound = function(requestId) {
      return promiseCache({
        key: 'outboundrequest_' + requestId,
        args: [requestId],
        ttl: 60*60*24*1000,
        localStorageEnabled: true,
        promise: function(requestId) {
          return RestService.get('request/outbound/' + requestId);
        }
      }).then(formatOutbound);
    };

    service.getInbound = function(requestId) {
      return promiseCache({
        key: 'inboundrequest_' + requestId,
        args: [requestId],
        ttl: 60*60*24*1000,
        localStorageEnabled: true,
        promise: function(requestId) {
          return RestService.get('request/inbound/' + requestId);
        }
      }).then(formatInbound);
    };

    function formatOutbound(request) {
      request.to = ModelService.hydrate(AccountService.get, request.to);
      request.from = ModelService.hydrate(AccountService.get, request.from);
      return request;
    }

    function formatInbound(request) {
      request.player = ModelService.hydrate(AccountService.get, request.player);
      return request;
    }

    return service;
  }

  angular.module('golfWithMe')
    .service('RequestService', RequestService)
})();
