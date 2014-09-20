(function() {
  'use strict';

  function PlaydateService(RestService) {
    var service = {};

    service.get = function(id) {
      return RestService.get('playdate/' + id)
        .then(function(playdate) {
          return service.formatPlaydate(playdate);
        })
    };

    service.formatPlaydate = function(playdate) {
      var date = moment(playdate.date);
      playdate._formattedDate = date.calendar();
      playdate._unixDate = date.unix();
      playdate._empties = _.times(playdate.maxPlayers - playdate.players.length, _.identity);
      playdate.messages = _.map(playdate.messages, function(message) {
        message._formattedDate = moment(message.date).calendar();
        return message;
      });
      playdate.events = _.map(playdate.events, function(event) {
        event._formattedDate = moment(event.date).calendar();
        return event;
      });
      return playdate;
    }

    return service;
  }

  angular.module('golfWithMe')
    .factory('PlaydateService', PlaydateService);
})();
