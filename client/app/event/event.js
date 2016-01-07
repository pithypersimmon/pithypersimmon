angular.module('foodbnb.event', [])
.controller('eventCtrl', function ($scope) {
  $scope.data = {};

  var initializeEvents = function() {
    Events.getAll()
      .then(function (events) {
        $scope.data.events = events;
      })
      .catch(function(error) {
        console.error(error);
      });
  };
  initializeEvents();
});