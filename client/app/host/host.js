//Hosting Form Page

angular.module('foodbnb.host', [])
.controller('hostCtrl', function ($scope, Events) {
  $scope.event = {};

  var userObject = JSON.parse(localStorage.getItem('user'));
  $scope.event.username = userObject.email;
  $scope.resetForm = function () {
    console.log("Reset");
    //Scroll to the top of the page
    $("html, body").animate({ scrollTop: 0 }, "slow");

    $scope.$broadcast('show-errors-reset');
  };
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
        //Apply Style to all addresses
        $('.address').toggleClass('has-error');
        $("<div class= 'has-error'><p class='help-block'>Invalid Address</p></div>").insertAfter('.guests');

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
          clearFields();
        }); 
      }
    });  
  };

  var clearFields = function () {
    for (var prop in $scope.event) {
      $scope.event[prop] = "";
    }
  };

  

}).
directive('showErrors', function ($timeout) {
  return {
    // Uses Attribute to match directive
    restrict: 'A',
    require:  '^form',
    link: function (scope, el, attrs, formCtrl) {
      // find the text box element, which has the 'name' attribute
      var inputEl   = el[0].querySelector("[name]");
      // convert the native text box element to an angular element
      var inputNgEl = angular.element(inputEl);
      // get the name on the text box so we know the property to check
      // on the form controller
      var inputName = inputNgEl.attr('name');

      // only apply the has-error class after the user leaves the text box
      inputNgEl.bind('blur', function() {
        el.toggleClass('has-error', formCtrl[inputName].$invalid);
      });

      //Event Listener to Reset Fields
      scope.$on('show-errors-reset', function() {
        console.log("Listener Activated");
        
        //Using elem  
        el.children()[0].value = '';
        $timeout(function() {
          el.removeClass('has-error');
        }, 0, false);
        
      });

      //Event Listener to toggle all validity checks
      scope.$on('show-errors-check-validity', function() {
        el.toggleClass('has-error', formCtrl[inputName].$invalid);
      });


    }

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