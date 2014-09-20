(function() {
  'use strict';

  function ScheduleService(RestService, PlaydateService) {
    var service = {};

    service.get = function() {
      return RestService.get('schedule')
        .then(function(schedule) {
          return _.map(schedule, PlaydateService.formatPlaydate);
        })
    };

    return service;
  }

  angular.module('golfWithMe')
    .factory('ScheduleService', ScheduleService);
})();
