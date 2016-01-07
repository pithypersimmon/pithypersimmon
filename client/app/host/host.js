angular.module('foodbnb.host', [])
.controller('hostCtrl', function ($scope) {
  $scope.event = {};
  $scope.newEvent = function (Events) {
    Events.addOne($scope.event).
    then(function (response) {
      console.log("Successful Post");   
    });
  };
});