angular.module('foodbnb.event', [])
.controller('eventCtrl', function ($scope, Events) {
  $scope.data = {};
  $scope.userObject = JSON.parse(localStorage.getItem('user'));

  $scope.count = 0;
  $scope.picture = function () {
    
  };
  var initializeEvents = function() {
    Events.getAll()
      .then(function (events) {
        console.log(events);
        $scope.data.events = events;
      })
      .catch(function(error) {
        console.error(error);
      });
  };
  
  $scope.joinAnEvent = function(id) {
    Events.joinEvent(id, $scope.userObject);
    initializeEvents();
  };

  initializeEvents();
});