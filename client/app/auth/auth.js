// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('shortly.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.signinForm = {};
  $scope.signinForm.$valid = false;
  $scope.signinForm.hasBeenSubmitted = false;
  $scope.signin = function () {
    $scope.signinForm.hasBeenSubmitted = true;
    console.log($scope.signinForm.$valid);
    if ($scope.signinForm.$valid) {
      Auth.signin($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.shortly', token);
          $location.path('/links');
        })
        .catch(function (error) {
          alert('yo password or username is WRONG');
        }); 
    } else {
      // console.error($scope.signinForm.$error);
      // alert('Username or password too short!');
    } 
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
