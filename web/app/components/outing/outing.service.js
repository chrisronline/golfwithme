(function() {
  'use strict';

  function OutingService(RestService, DATE_STRINGS, TIME_STRINGS, AccountService) {
    var service = {};

    service.get = function(id) {
      return RestService.get('outing/' + id)
        .then(service.formatOuting);
    };

    service.invite = function(outingId, playerId) {
      return RestService.post('outing/invite', {outingId:outingId, to:playerId})
        .then(service.formatOuting);
    };

    service.formatOuting = function(outing) {
      var date = moment(outing.date);
      outing._formattedDate = date.calendar();
      outing._formattedDateLong = date.format(DATE_STRINGS.LONG);
      outing._formattedTime = date.format(TIME_STRINGS.SHORTHAND);
      outing._unixDate = date.unix();

      outing.players = _.map(outing.players, AccountService.fillAccount);

      outing._empties = _.times(outing.maxPlayers - outing.players.length, function() {
        return {id:_.random(1,10000000)};
      });
      outing.messages = _.map(outing.messages, function(message) {
        message._formattedDate = moment(message.date).calendar();
        message.user = AccountService.fillAccount(message.userId);
        return message;
      });
      outing.events = _.map(outing.events, function(event) {
        event._formattedDate = moment(event.date).calendar();
        event.user = AccountService.fillAccount(event.userId);
        return event;
      });
      outing.outboundRequests = _.map(outing.outboundRequests, function(request) {
        request.to = AccountService.fillAccount(request.to);
        request.from = AccountService.fillAccount(request.from);
        return request;
      });
      console.log(outing);
      return outing;
    }

    return service;
  }

  angular.module('golfWithMe')
    .factory('OutingService', OutingService);
})();
