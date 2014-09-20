(function() {
  'use strict';

  function PlayNowController($scope, FindService, DATE_STRINGS, TIME_STRINGS) {
    var ctrl = this;

    function formatCityForSelectize(city) {
      return {
        id: city.formatted_address,
        name: city.formatted_address
      };
    }

    ctrl.matches = [];
    ctrl.form = {
      when: moment().format(DATE_STRINGS.WIRE),
      howmany: 2
    };
    ctrl.where = {
      valueField: 'id',
      labelField: 'name',
      searchField: 'name',
      options: [],
      create: false,
      load: function(query, callback) {
        if (!query.length) return callback();
        FindService.findCity(query)
          .then(function(cities) {
            var results = _.map(cities.results, formatCityForSelectize);
            callback(results);
          })
      }
    };
    ctrl.find = function() {
      FindService.find(ctrl.form)
        .then(function(matches) {
          ctrl.matches = _.map(matches, function(match) {
            var matchDate = moment(match.date);
            match._formattedDate = matchDate.format(DATE_STRINGS.SHORTHAND);
            match._formattedTime = matchDate.format(TIME_STRINGS.SHORTHAND);
            match._empties = _.times(match.maxPlayers - match.players.length, _.identity);
            if (match.playRequest) {
              var playRequestDate = moment(match.playRequest.date);
              match.playRequest = _.extend(match.playRequest, {
                _formattedDate: playRequestDate.format(DATE_STRINGS.SHORTHAND)
              });
            }
            return match;
          });
        });
    };

    ctrl.join = function(playDateId) {

    };

    function init() {
      ctrl.where.control.load(function(callback) {
        FindService.findUserCity()
          .then(function(city) {
            var formatted = formatCityForSelectize(city);
            ctrl.form.where = formatted.id;
            callback([formatted]);
          })
      });
    }

    var unbind = $scope.$watch(function() { return ctrl.where.control; }, function(newControl) {
      if (newControl) {
        init();
        unbind();
      }
    });
  }

  function PlayNowDirective() {
    return {
      restrict: 'EA',
      templateUrl: 'components/dashboard/playnow/playnow.directive.html'
    };
  }

  angular.module('golfWithMe')
    .controller('PlayNowController', PlayNowController)
    .directive('playNow', PlayNowDirective);
})();
