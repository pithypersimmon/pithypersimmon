angular.module('foodbnb.splash', [])
.controller('splashCtrl', function ($scope, Events) {
  $scope.data = {};
  Events.getAll().then(function (data) {
    $scope.data.events = data;
  });
});