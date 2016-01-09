var Q = require('q');
var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  
  description: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true,
    unique: false
  },

  time: {
    type: Date
  },

  date: {
    type: Date,
    // required: true
  },

  guestsCap: {
    type: Number,
    required: true
  },


  address: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

  zip: {
    type: Number,
    required: true
  },

// TBD image upload feature
  // image: {
  //   type: binData,
  //   required: false
  // },
  host: {
    type: String
  },


  guests: {
    type: Array,
    required: false
  },

  price: {
    type: Number
  }

});


// // Reteive all events
// EventSchema.methods.retrieveAllEvents = function() {
//   Event.find({}, function(err, events) {
//     if(!err) { 
//       return events;
//     } else {
//       throw err;
//     }
// });


// // Reteive event by id
// UserSchema.methods.retrieveEventById = function (id) {
// };

// // Reteive event by location
// UserSchema.methods.retrieveEventByLocation = function (location) {
// };


module.exports = mongoose.model('Event', EventSchema);