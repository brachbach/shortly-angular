angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $location, Links, Auth) {
  $scope.data = {};
  Links.getAll().then(function(links) {
    $scope.data.links = links;
  });
  $scope.signout = function() {
    Auth.signout();
  };
  $scope.links = function() {
    $location.path('/links');
  };
  $scope.shorten = function() {
    $location.path('/shorten');
  };
});
