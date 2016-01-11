angular.module('foodbnb.splash', [])
.controller('splashCtrl', function ($scope, Events) {
  $scope.data = {};
  Events.getAll().then(function (data) {
    $scope.data.events = data;
  });


  //Will create new arrays to save into 
  //Will have to edit splash html to ng-repeat over new variables

  // Events.getHosting().then(function (data) {
  //   $scope.data.hosting = data;
  // });


  // Events.getAttending().then(function (data) {
  //   $scope.data.attending = data;
  // });

});