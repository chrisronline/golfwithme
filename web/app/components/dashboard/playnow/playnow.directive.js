(function() {
  'use strict';

  function PlayNowController($scope, GoogleService) {
    var ctrl = this;

    ctrl.form = {};

    ctrl.where = {
      valueField: 'id',
      labelField: 'name',
      searchField: 'name',
      options: [],
      create: false,
      load: function(query, callback) {
        if (!query.length) return callback();
        GoogleService.lookupCity(query)
          .then(function(cities) {
            var idx=1;
            var results = _.map(cities.results, function(result) {
              return {
                id: idx++,
                name: result.formatted_address
              }
            });
            callback(results);
          })
      }
    };

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
