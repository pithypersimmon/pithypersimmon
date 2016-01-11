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
    type: Date
    // required: true
  },

  guestsCap: {
    type: Number
    // required: true
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

  host: {
    type: String
  },

  guests: {
    type: Array
  },

  price: {
    type: Number
  }

});



module.exports = mongoose.model('Event', EventSchema);