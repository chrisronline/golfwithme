(function() {
  'use strict';

  function OutingConfig($stateProvider) {
    $stateProvider
      .state('outing', {
        url: '/outing/:id/:activeTab',
        templateUrl: 'components/outing/outing.html',
        controller: 'OutingCtrl',
        controllerAs: 'outingCtrl',
        resolve: {
          outing: function($stateParams, OutingService, DATE_STRINGS) {
            return OutingService.get($stateParams.id)
              .then(function(outing) {
                outing._dateControl = moment(outing.date).format(DATE_STRINGS.DATE_CONTROL);
                outing._timeControl = moment(outing.date).format(DATE_STRINGS.TIME_CONTROL);
                return outing;
              })
          },
          activeTab: function($stateParams) {
            return $stateParams.activeTab || 'players';
          }
        },
        requiresAuth: true
      });
  }

  function OutingCtrl(outing, $state, activeTab, FindService, AccountService, OutingService, DATE_STRINGS) {
    var outingCtrl = this;

    outingCtrl.outing = outing;
    outingCtrl.tabs = { active: activeTab };
  }

  angular.module('golfWithMe')
    .config(OutingConfig)
    .controller('OutingCtrl', OutingCtrl);
})();
