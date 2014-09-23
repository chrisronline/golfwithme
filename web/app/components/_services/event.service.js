(function() {
  'use strict';

  function EventService(RestService, promiseCache, AccountService, ModelService) {
    var service = {};

    service.get = function(eventId) {
      return promiseCache({
        key: 'event_' + eventId,
        args: [eventId],
        ttl: 60*60*24*1000,
        localStorageEnabled: true,
        promise: function(eventId) {
          return RestService.get('event/' + eventId);
        }
      }).then(formatEvent);
    };

    function formatEvent(event) {
      event._formattedDate = moment(event.date).calendar();
      event.user = ModelService.hydrate(AccountService.get, event.userId);
      return event;
    }

    return service;
  }

  angular.module('golfWithMe')
    .service('EventService', EventService)
})();
