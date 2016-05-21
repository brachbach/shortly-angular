angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links, Auth) {
  $scope.link = {};
  $scope.addLink = function() {
    Links.addOne({url: $scope.link.url})
    .then(function(resp) {
      // console.log(resp);
      return resp;
    });
  };
  $scope.signout = function() {
    Auth.signout();
  };
});
