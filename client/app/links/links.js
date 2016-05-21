angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $location, Links, Auth, LinkPrepService) {
  $scope.data = {};
  $scope.data.links = LinkPrepService;
  // console.log($scope.data);
  // Links.getAll().then(function(links) {
  //   $scope.data.links = links;
  // });
  $scope.signout = function() {
    Auth.signout();
  };
  $scope.links = function() {
    $location.path('/links');
  };
  $scope.shorten = function() {
    $location.path('/shorten');
  };
})
.directive('shortenedLink', function() {
  return {
    template : '<div class="visits"><span class="count">{{link.visits}}</span>\
     Visits</div><div class="title">{{link.title}}</div><div class="original">{{link.url}}</div>\
     <a href="{{link.baseUrl}}/{{link.code}}">{{link.baseUrl}}/{{link.code}}</a>'
  };
});
