angular.module('shortly', [
  'shortly.services',
  'shortly.links',
  'shortly.shorten',
  'shortly.auth',
  'ui.router',
  'ngRoute'
])
.config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/links');
  $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .state('links', {
      url: '/links',
      templateUrl: 'app/links/links.html',
      controller: 'LinksController',
      authenticate: true,
      // resolve: {
      //   LinkPrepService: function(Links) {
      //     return Links.getAll();
      //   }
      // }
    })
    .state('shorten', {
      url: '/shorten',
      templateUrl: 'app/shorten/shorten.html',
      controller: 'ShortenController',
      authenticate: true
    });
    // .otherwise({
    //   templateUrl: 'app/links/links.html',
    //   controller: 'LinksController',
    //   authenticate: true
    // });


    // Your code here

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
  $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
    // if (next.$$route  && next.$$route.authenticate && !Auth.isAuth()) {
    //   $location.path('/signin');
    // }
    // event.preventDefault();
    console.log('routechange invoked');
    if (toState && toState.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
