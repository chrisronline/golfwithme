(function() {
  'use strict';

  function DashboardConfig($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'components/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard',
        resolve: {
          schedule: function(ScheduleService) {
            return ScheduleService.get();
          }
        },
        requiresAuth: true
      });
  }

  function DashboardCtrl($scope, schedule) {
    var dashboardCtrl = this;

    dashboardCtrl.schedule = _.sortBy(schedule, '_unixDate');
  }

  angular.module('golfWithMe')
    .config(DashboardConfig)
    .controller('DashboardCtrl', DashboardCtrl);
})();
