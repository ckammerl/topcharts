angular.module('topcharts')
  .controller('TopGrossingCtrl', function($scope, $compile, $location, $anchorScroll, serverData) {
    $scope.dataType = 'all';
    $scope.skip = 0;
    $scope.limit = 50;

    serverData.sendRequest($scope.dataType, $scope.skip, $scope.limit, function(data) {
      $scope.allApps = data;

      angular.element(document.getElementById('update-topgrossing')).append($compile("<button class='btn-primary btn-sm' ng-click='update()'>Next</button>")($scope));
    });

    $scope.update = function() {
      $scope.skip += 50;

      serverData.sendRequest($scope.dataType, $scope.skip, $scope.limit, function(data) {
        $scope.allApps = data;
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('top-topgrossing');

        // call $anchorScroll()
        $anchorScroll();
      });
    };
  });
