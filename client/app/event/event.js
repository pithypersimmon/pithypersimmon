angular.module('foodbnb.event', [])
.controller('eventCtrl', function ($scope, Events) {
  $scope.data = {};
  $scope.id;

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
  $scope.storeId = function () {
    $scope.id = $scope.event._id;
  }

  $scope.joinAnEvent = function(id) {
    Events.joinEvent(id);
    initializeEvents();
  };

  initializeEvents();
});