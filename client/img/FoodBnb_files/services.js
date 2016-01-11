angular.module('foodbnb.services', [])
.factory('Host', function ($http) {


  return {

  };
})
.factory('Guest', function ($http) {
})

.factory('Login', function ($http) {

  var checkAuth = function() {
    // grab user token from localStorage
    var user = JSON.parse(localStorage.getItem('user'));

    // API expects token in the headers
    return $http({
      method: 'GET',
      url: '/api/users/signedin',
      headers: { 'x-access-token' : user.token }
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function(error) {
      console.error(error);
    });
  };

  return {
    checkAuth: checkAuth
  };
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

  var getHosting = function(username) {
    return $http({
      method: 'GET',
      url: '/api/events/hosting/' + username
    }).then(function (res) {
      return res.data;
    });
  };

  var getAttending = function(username) {
    return $http({
      method: 'GET',
      url: '/api/events/attending/' + username
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

  var joinEvent = function(id, userData) {
    return $http({
      method: 'PUT',
      url: '/api/events/' + id,
      data: userData
    });
  };

  var checkAddress = function (address) {
    return $http({
      method: 'GET',
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address + "&key=AIzaSyD9kDPxH-z7bQ8RyALVYDjNxWn5Xsd7ilg"
    }).then(function (res) {
      //res.status will return OK if the address is valid
      return res.data.results[0].geometry.location_type;
    });
  };

  return {
    checkAddress: checkAddress,
    getAll: getAll,
    getHosting: getHosting,
    getAttending: getAttending,
    addOne: addOne,
    joinEvent: joinEvent
  };
});