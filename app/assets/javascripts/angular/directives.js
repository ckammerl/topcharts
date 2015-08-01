angular.module('topcharts')
  .directive('rating', function() {
    return {
      restrict: 'EA',
      template:
        '<ul class="star-rating"' +
        '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}">' +
        '    <i class="fa fa-star"></i>' +
        '  </li>' +
        '</ul>',
      scope: {
        max: '=?', // optional (default is 5),
        stars: '=?'
      },
      //Directives that want to modify the DOM typically use the link option. link takes a function with the following signature, function link(scope, element, attrs)
      // scope = Angular scope object
      // element = the jqLite-wrapped element that this directive matches
      // attr = is a hash object with key-value pairs of normalized attribute names and their corresponding attribute values
      link: function(scope, element, attr) {
        if (scope.max == undefined) {
          scope.max = 5;
        }

        // fetch num_stars for current app (see directive in child view)
        scope.ratingValue = scope.$eval(attr.ratingValue);
        // alert(scope.ratingValue)
        scope.stars = updateStars();
        function updateStars() {
          scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled: i < scope.ratingValue
            });
          }
          return scope.stars; //[{filled: true}, {filled: true}, etc]
        };
      }
    };
  })


