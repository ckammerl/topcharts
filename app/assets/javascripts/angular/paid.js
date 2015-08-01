angular.module('topcharts')
  .controller('PaidCtrl', function($scope, $compile, $location, $anchorScroll, serverData) {
    $scope.dataType = 'paid';
    $scope.skip = 0;
    $scope.limit = 50;

    serverData.sendRequest($scope.dataType, $scope.skip, $scope.limit, function(data) {
      $scope.paidApps = data;

      angular.element(document.getElementById('update-paid')).append($compile("<button class='btn-primary btn-sm' ng-click='update()'>Next</button>")($scope));
    });

    $scope.update = function() {
      $scope.skip += 50;

      serverData.sendRequest($scope.dataType, $scope.skip, $scope.limit, function(data) {
        $scope.paidApps = data;
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('top-paid');

        // call $anchorScroll()
        $anchorScroll();
      });
    };

    $scope.goToTop = function() {
      $location.hash('top-paid');

      // call $anchorScroll()
      $anchorScroll();
    };
  });

