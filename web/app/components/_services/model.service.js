(function() {
  'use strict';

  function ModelService() {
    var service = {};

    service.hydrate = function(promise, id) {
      var obj = {id:id};
      promise(id).then(
        function(_obj) {
          obj = _.extend(obj, _obj);
        }
      );
      return obj;
    };

    return service;
  }

  angular.module('golfWithMe')
    .service('ModelService', ModelService);
})();
