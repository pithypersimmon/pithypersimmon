angular.module('foodbnb.services', [])
.factory('Host', function ($http) {


  return {

  };
})
.factory('Guest', function ($http) {

})

// Service to handle event methods
.factory('Events', function($http) {
  // Retreives all events
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/events'
    }).then(function (res) {
      return res.data;
    });
  };
  // Add event
  var addOne = function(event) {
    return $http({
      method: 'POST',
      url: '/api/events',
      data: event
    });
  };

  return {
    getAll: getAll,
    addOne: addOne
  };
});