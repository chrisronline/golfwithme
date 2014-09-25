(function() {
  'use strict';

  function OutingPlayersCtrl($scope, FindService, OutingService) {
    var playersCtrl = this;
    var outingCtrl = $scope.outingCtrl;

    playersCtrl.inviteOpts = {
      labelField: '_displayName',
      valueField: 'id',
      sortField: '_displayName',
      searchField: '_displayName',
      load: function(query, callback) {
        console.log('hi', query);
        FindService.findPlayers(query)
          .then(function(players) {
            players = _.reject(players, function(player) {
              return !!_.find(outingCtrl.outing.players, {id:player.id});
            })
            callback(players);
          });
      }
    };
    playersCtrl.addOpts = {
      labelField: '_displayName',
      valueField: 'id',
      sortField: '_displayName',
      searchField: '_displayName',
      options: _.map(outingCtrl.outing.inboundRequests, function(request) {
        return {id: request.player.id, _displayName:request.player._displayName};
      })
    };

    playersCtrl.toggle = function(player) {
      player._visible = !player._visible;
    };
    playersCtrl.invite = function(player) {
      outing._empties = _.reject(outing._empties, {id:player.id});
      OutingService.invite(outing.id, player.id)
        .then(function(outing) {
          outingCtrl.outing = outing;
        });
    };
  }

  angular.module('golfWithMe')
    .controller('OutingPlayersCtrl', OutingPlayersCtrl);
})();
