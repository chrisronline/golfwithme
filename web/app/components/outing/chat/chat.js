(function() {
  'use strict';

  function OutingChatCtrl($scope, ngTableParams, $filter) {
    var chatCtrl = this;
    var outingCtrl = $scope.outingCtrl;
    var orderBy = $filter('orderBy');

    //http://bazalt-cms.com/ng-table/example/3
    chatCtrl.tableParams = new ngTableParams({
      page: 1,
      count: 5,
      sorting: {
        date: 'desc'
      }
    }, {
      counts: [],
      total: outingCtrl.outing.messages.length,
      getData: function($defer, params) {
        var data = params.sorting() ? orderBy(outingCtrl.outing.messages, params.orderBy()) : outingCtrl.outing.messages;
        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });
  }

  angular.module('golfWithMe')
    .controller('OutingChatCtrl', OutingChatCtrl);
})();
