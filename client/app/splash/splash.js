angular.module('foodbnb.splash', [])
.controller('splashCtrl', function ($scope, Events) {
  $scope.data = {};
  // Events.getAll().then(function (data) {
  //   $scope.data.events = data;
  // });

  //Pull down array of events you are hosting
  Events.getHosting().then(function (data) {
    $scope.data.hosting = data;
  });

  //Pull down array of events you are atteneding
  Events.getAttending().then(function (data) {
    $scope.data.attending = data;
  });
});