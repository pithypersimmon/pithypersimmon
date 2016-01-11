//Hosting Form Page

angular.module('foodbnb.host', [])
.controller('hostCtrl', function ($scope, Events) {
  $scope.event = {};
  var userObject = JSON.parse(localStorage.getItem('user'));
  $scope.event.username = userObject.email;
  $scope.newEvent = function (){
    console.log($scope.event);

    /*Concatenates and replaces space with plus signs to 
    create a complete address for google geocode api*/
    var address = "" + $scope.event.address + "+" + $scope.event.city + 
    "+" + $scope.event.state + "+" + $scope.event.zip;
    address = address.replace(/ /g,"+");
    
    //Checks validity of address before calling Events.addOne
    //Look at services if you're confused
    Events.checkAddress(address)
    .then(function (response) {
      console.log("Address Response: ", response);  
      if (response !== 'ROOFTOP') {
        console.log("Invalid Address");
        return false;
      } else {
        return true;
      }
    })
    .then( function (bool) {
      if (bool) { 
        Events.addOne($scope.event)
        .then(function (response) {
          if (response) console.log("Successful Post");   
        }); 
      }
    });  
  };
});


// {
//   "results": [
//     {
//       "address_components": [
//         {
//           "long_name": "91011",
//           "short_name": "91011",
//           "types": [
//             "postal_code"
//           ]
//         },
//         {
//           "long_name": "La Cañada Flintridge",
//           "short_name": "La Cañada Flintridge",
//           "types": [
//             "locality",
//             "political"
//           ]
//         },
//         {
//           "long_name": "Los Angeles County",
//           "short_name": "Los Angeles County",
//           "types": [
//             "administrative_area_level_2",
//             "political"
//           ]
//         },
//         {
//           "long_name": "California",
//           "short_name": "CA",
//           "types": [
//             "administrative_area_level_1",
//             "political"
//           ]
//         },
//         {
//           "long_name": "United States",
//           "short_name": "US",
//           "types": [
//             "country",
//             "political"
//           ]
//         }
//       ],
//       "formatted_address": "La Cañada Flintridge, CA 91011, USA",
//       "geometry": {
//         "bounds": {
//           "northeast": {
//             "lat": 34.2596259,
//             "lng": -118.1658671
//           },
//           "southwest": {
//             "lat": 34.17661,
//             "lng": -118.231873
//           }
//         },
//         "location": {
//           "lat": 34.2133926,
//           "lng": -118.1941785
//         },
//         "location_type": "APPROXIMATE",
//         "viewport": {
//           "northeast": {
//             "lat": 34.2596259,
//             "lng": -118.1658671
//           },
//           "southwest": {
//             "lat": 34.17661,
//             "lng": -118.231873
//           }
//         }
//       },
//       "partial_match": true,
//       "place_id": "ChIJgxloKvbBwoARbQCI8mGxiHA",
//       "postcode_localities": [
//         "LA CANADA FLT",
//         "La Cañada Flintridge"
//       ],
//       "types": [
//         "postal_code"
//       ]
//     }
//   ],
//   "status": "OK"
// }