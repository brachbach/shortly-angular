angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  $scope.link = {};
  $scope.addLink = function() {
    Links.addOne($scope.link.url)
    .then(function(resp) {
      console.log(resp);
      return resp;
    });
  };
});
