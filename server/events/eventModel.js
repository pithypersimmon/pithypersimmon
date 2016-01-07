var Q = require('q');
var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  eventname: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: true
  },

  guests: {
    type: int,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  location: {
    type: String,
    required: true
  },

// TBD image upload feature
  // image: {
  //   type: binData,
  //   required: false
  // },

  users: {
    type: Array,
    required: false
  },

  guests: {
    type: Array,
    required: false
  }

});

// Reteive all events
EventSchema.methods.retrieveAllEvents = function() {
  Event.find({}, function(err, events) {
    if(!err) {
      return events;
    } else {
      throw err;
    }
  });
};

// Reteive event by id
UserSchema.methods.retrieveEventById = function (id) {
};

// Reteive event by location
UserSchema.methods.retrieveEventByLocation = function (location) {
};


module.exports = mongoose.model('event', EventSchema);