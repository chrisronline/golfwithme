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
          outing: function($stateParams, OutingService) {
            return OutingService.get($stateParams.id);
          },
          activeTab: function($stateParams) {
            return $stateParams.activeTab || 'players';
          }
        },
        requiresAuth: true
      });
  }

  function OutingCtrl(outing, $state, activeTab, FindService, AccountService, OutingService) {
    var outingCtrl = this;

    outingCtrl.outing = outing;
    outingCtrl.tabs = { active: activeTab };
    outingCtrl.invite = {
      options: {
        labelField: '_displayName',
        valueField: 'id',
        sortField: '_displayName',
        searchField: '_displayName',
        load: function(query, callback) {
          FindService.findPlayers(query)
            .then(function(players) {
              players = _.reject(players, function(player) {
                return !!_.find(outingCtrl.outing.players, {id:player.id});
              })
              callback(players);
            });
        }
      }
    };
    outingCtrl.add = {
      toggle: function(player) {
        player._visible = !player._visible;
      },
      invite: function(player) {
        outing._empties = _.reject(outing._empties, {id:player.id});
        OutingService.invite(outing.id, player.id)
          .then(function(outing) {
            outingCtrl.outing = outing;
          });
      },
      options: {
        labelField: '_displayName',
        valueField: 'id',
        sortField: '_displayName',
        searchField: '_displayName',
      }
    };
  }

  angular.module('golfWithMe')
    .config(OutingConfig)
    .controller('OutingCtrl', OutingCtrl);
})();
