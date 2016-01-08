angular.module('foodbnb.event', [])
.controller('eventCtrl', function ($scope, Events) {
  $scope.data = {};

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
  initializeEvents();
});