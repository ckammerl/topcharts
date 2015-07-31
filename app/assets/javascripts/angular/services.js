angular.module('topcharts')
  .factory('serverData', function($resource) {
    var dataResource = $resource('/data.json');

    var sendRequest = function(type, num_skip, limit_result, callback) {
      dataResource.query(
        {type: type,
         num_skip: num_skip,
         limit_result: limit_result
        }, callback);
    };

    return {
      sendRequest: sendRequest
    }
  });

