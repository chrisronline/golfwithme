(function() {
  'use strict';

  function DashboardConfig($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'components/dashboard/dashboard.html'
      });
  }

  function DashboardCtrl($scope, FindService) {
    var dashboardCtrl = this;

    dashboardCtrl.opened = false;
    dashboardCtrl.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      dashboardCtrl.opened = true;
    };

    dashboardCtrl.data = {
      date: moment().startOf('day').unix() * 1000
    };

    dashboardCtrl.finding = false;
    dashboardCtrl.find = function() {
      dashboardCtrl.finding = true;

      var data = _.extend({}, dashboardCtrl.data, {
        date: moment(dashboardCtrl.data.date).startOf('day')
      });

      FindService.find(data).then(
        function(response) {
          dashboardCtrl.matches = response.matches;
        }
      ).finally(
        function() {
          dashboardCtrl.finding = false;
        }
      )
    };
  }

  angular.module('golfWithMe')
    .config(DashboardConfig)
    .controller('DashboardCtrl', DashboardCtrl);
})();
