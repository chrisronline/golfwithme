(function() {
  'use strict';

  function OutingService(RestService, DATE_STRINGS, TIME_STRINGS, ModelService,
    AccountService, MessageService, EventService, RequestService) {

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

      outing.players = _.map(outing.players, _.partial(ModelService.hydrate, AccountService.get));
      outing.messages = _.map(outing.messages, _.partial(ModelService.hydrate, MessageService.get));
      outing.events = _.map(outing.events, _.partial(ModelService.hydrate, EventService.get));
      outing.outboundRequests = _.map(outing.outboundRequests, _.partial(ModelService.hydrate, RequestService.getOutbound));
      outing.inboundRequests = _.map(outing.inboundRequests, _.partial(ModelService.hydrate, RequestService.getInbound));

      var empties = outing.maxPlayers - outing.players.length - outing.outboundRequests.length;
      outing._empties = _.times(empties, function() {
        return {id:_.random(1,10000000)};
      });
      console.log(outing);
      return outing;
    }

    return service;
  }

  angular.module('golfWithMe')
    .factory('OutingService', OutingService);
})();
