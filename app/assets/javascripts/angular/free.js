angular.module('topcharts')
  .controller('FreeCtrl', function($scope, $compile, $location, $anchorScroll, serverData) {
    $scope.dataType = 'free';
    $scope.skip = 0;
    $scope.limit = 50;

    serverData.sendRequest($scope.dataType, $scope.skip, $scope.limit, function(data) {
      $scope.freeApps = data;

      angular.element(document.getElementById('update-free')).append($compile("<button class='btn-primary btn-sm' ng-click='update()'>Next</button>")($scope));
    });

    $scope.update = function() {
      $scope.skip += 50;

      serverData.sendRequest($scope.dataType, $scope.skip, $scope.limit, function(data) {
        $scope.freeApps = data;
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('top-free');

        // call $anchorScroll()
        $anchorScroll();
      });
    };
  });
