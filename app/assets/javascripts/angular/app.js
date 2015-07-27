angular
    .module('topcharts', [
        'ngAnimate',
        'ui.router',
        'templates'
    ])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state('topcharts', {
          url: '/topcharts',
          templateUrl: 'topcharts.html',
          controller: 'TopchartsCtrl'
        })
        .state('topcharts.paid', {
          url: '/paid',
          templateUrl: 'topcharts/paid.html'
        })
        .state('topcharts.free', {
          url: '/free',
          templateUrl: 'topcharts/free.html'
        })
       .state('topcharts.all', {
          url: '/top-grossing',
          templateUrl: 'topcharts/all.html'
        })

        // default route
        $urlRouterProvider.otherwise('/topcharts');
    });