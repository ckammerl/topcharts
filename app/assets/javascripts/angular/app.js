angular
    .module('topcharts', [
        'ngAnimate',
        'ui.router',
        'templates',
        'ngResource'
    ])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state('topcharts', {
          url: '/topcharts',
          templateUrl: 'topcharts.html'
        })
        .state('topcharts.paid', {
          url: '/paid',
          templateUrl: 'topcharts/paid.html',
          controller: 'PaidCtrl'
        })
        .state('topcharts.free', {
          url: '/free',
          templateUrl: 'topcharts/free.html',
          controller: 'FreeCtrl'
        })
       .state('topcharts.top-grossing', {
          url: '/top-grossing',
          templateUrl: 'topcharts/top_grossing.html',
          controller: 'TopGrossingCtrl'
        })

        // default route
        $urlRouterProvider.otherwise('/topcharts');
    });