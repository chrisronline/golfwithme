(function() {
  'use strict';

  function PlaydateConfig($stateProvider) {
    $stateProvider
      .state('playdate', {
        url: '/playdate/:id/:activeTab',
        templateUrl: 'components/playdate/playdate.html',
        controller: 'PlaydateCtrl',
        controllerAs: 'playdateCtrl',
        resolve: {
          playdate: function($stateParams, PlaydateService) {
            return PlaydateService.get($stateParams.id);
          },
          activeTab: function($stateParams) {
            return $stateParams.activeTab || 'players';
          }
        },
        requiresAuth: true
      });
  }

  function PlaydateCtrl(playdate, $state, activeTab) {
    var playdateCtrl = this;

    console.log(activeTab);

    playdateCtrl.playdate = playdate;
    playdateCtrl.tabs = { active: activeTab };
  }

  angular.module('golfWithMe')
    .config(PlaydateConfig)
    .controller('PlaydateCtrl', PlaydateCtrl);
})();
