angular.module('foodbnb.splash', [])
.controller('splashCtrl', function ($scope, Events) {
  $scope.data = {};
  var userObject = JSON.parse(localStorage.getItem('user'));
  $scope.username = userObject.email;
  // Events.getAll().then(function (data) {
  //   $scope.data.events = data;
  // });
  

  //Pull down array of events you are hosting
  Events.getHosting($scope.username).then(function (data) {
    $scope.data.hosting = data;
  });

  //Pull down array of events you are atteneding
  Events.getAttending($scope.username).then(function (data) {
    $scope.data.attending = data;
  });
});