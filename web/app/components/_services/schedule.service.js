(function() {
  'use strict';

  function ScheduleService(RestService, OutingService) {
    var service = {};

    service.get = function() {
      return RestService.get('schedule')
        .then(function(schedule) {
          return _.map(schedule, OutingService.formatOuting);
        })
    };

    return service;
  }

  angular.module('golfWithMe')
    .factory('ScheduleService', ScheduleService);
})();
