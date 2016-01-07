angular.module('foodbnb', [
  'foodbnb.event',
  'foodbnb.guest',
  'foodbnb.host',
  'foodbnb.splash',
  'foodbnb.auth',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    redirectTo: '/splash'
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
  });
});