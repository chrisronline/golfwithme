(function() {
  'use strict';

  function PlayNowController($scope, FindService, DATE_STRINGS) {
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
            match._formattedDate = moment(match.date).format(DATE_STRINGS.SHORTHAND);
            match._empties = _.times(match.maxPlayers - match.players.length, _.identity);
            if (match.playRequest) {
              match.playRequest = _.extend(match.playRequest, {
                _formattedDate: moment(match.playRequest.date).format(DATE_STRINGS.SHORTHAND)
              });
            }
            return match;
          });
        });
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

    // var daysToShow = 7;
    // var now = moment();
    // var debug;
    //
    // var days = _.times(daysToShow, function() {
    //   var date = now.add(1, 'days');
    //   if (date.format('DD') == '28') {
    //     debug = date.format(dateStrings.UTC);
    //   }
    //   return {
    //     raw: date.format(dateStrings.UTC),
    //     dateLabel: date.format('MM/DD'),
    //     dayLabel: date.format('ddd')
    //   };
    // });
    //
    // ctrl.days = days;
    // ctrl.data = {};
    // ctrl.data[debug] = true;
    // ctrl.finding = false;
    // ctrl.find = function() {
    //   ctrl.finding = true;
    //
    //   var data = {
    //     dates: _.map(_.keys(ctrl.data), function(date) {
    //       return moment.utc(date).unix() * 1000
    //     })
    //   };
    //   FindService.find(data).then(
    //     function(response) {
    //       ctrl.matches = _.map(response.matches, function(match) {
    //         match._dateLabel = moment(match.date).format('ddd, MM/DD/YYYY @ h:mm a');
    //         return match;
    //       });
    //     }
    //   ).finally(
    //     function() {
    //       ctrl.finding = false;
    //     }
    //   )
    // };
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
