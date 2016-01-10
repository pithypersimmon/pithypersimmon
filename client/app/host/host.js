angular.module('foodbnb.host', [])
.controller('hostCtrl', function ($scope, Events) {
  $scope.event = {};
  $scope.newEvent = function (){
    console.log($scope.event);
    Events.addOne($scope.event)
    .then(function (response) {
      console.log("Successful Post");   
    });
  };  
});


