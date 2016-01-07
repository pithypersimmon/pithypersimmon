angular.module('foodbnb.host', [])
.controller('hostCtrl', function ($scope) {
  $scope.event = {};
  $scope.newEvent = function (Events) {
    console.log($scope.event);
    Events.addOne($scope.event)
    .then(function (response) {
      console.log("Successful Post");   
    });
  };
});