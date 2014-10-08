(function() {
  'use strict';

  function ScheduleService(RestService, OutingService) {
    var service = {};

    service.get = function() {
      return RestService.get('outings')
        .then(function(schedule) {
          var outings = schedule.outings;
          return _.map(outings, OutingService.formatOuting);
        })
    };

    return service;
  }

  angular.module('golfWithMe')
    .factory('ScheduleService', ScheduleService);
})();
