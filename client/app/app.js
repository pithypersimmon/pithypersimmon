angular.module('foodbnb', [
  'foodbnb.services',
  'foodbnb.event',
  'foodbnb.guest',
  'foodbnb.host',
  'foodbnb.splash',
  'foodbnb.auth',
  'foodbnb.services',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    redirectTo: '/splash'
  })
  .when('/login', {
    templateUrl: 'app/auth/login.html',
    controller: 'authCtrl'
  })
  .when('/splash', {
    templateUrl: 'app/splash/splash.html',
    controller: 'splashCtrl'
  })
  .when('/host', {
    templateUrl: 'app/host/host.html',
    controller: 'hostCtrl'
  })
  .when('/guest', {
    templateUrl: 'app/guest/guest.html',
    controller: 'guestCtrl'
  })
  .when('/event', {
    templateUrl: 'app/event/event.html',
    controller: 'eventCtrl'
  }).otherwise({
    redirectTo: '/splash'
  });
});