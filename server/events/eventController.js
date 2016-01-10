var Event = require('./eventModel.js');
    Q = require('q');
    util = require('../config/utils.js');

var createEvent = Q.nbind(Event.create, Event);
var findAllEvents = Q.nbind(Event.find, Event);
var findAnEvent = Q.nbind(Event.findOne, Event);


module.exports = {
  allEvents: function(req, res, next){
    findAllEvents({})
    .then(function(events){
      res.json(events);
    }).fail(function(error){
      next(error);
    });
  },

  addEvent: function(req, res, next){
    console.log(req.body);
    var title= req.body.title;
    var description = req.body.description;
    var time = req.body.time;
    var date = req.body.date;
    var guestsCap = req.body.guests;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
  	//Not sure where username is coming from. Dont see it in POST data.
    //var username = req.body.username;


		createEvent({
			host: username,
			title: title,
			description: description,
			time: time,
			date: date,
			guestsCap: guestsCap,
			address: address,
			city: city,
			state: state,
			zip: zip
		})
		.then(function(newEvent){
			res.json(newEvent);
		})
		.fail(function(error){
			next(error);
		});
	},

	
	//info for a specific event
	oneEvent: function(req, res, next) {
		var id = req.params.id;
		findAnEvent({_id: id})
		.then(function(event){
			res.json(event);
		}).fail(function(error){
			next(error);
		});

	},


	//puts user in event guests array
	addUserToEvent: function(req, res, next) {
		var user = req.body.user;
		var id = req.params.id;
		
		Event.findOne({ _id: id }).then(function(event){
  			if (event){
  				var len = event.guests.length;
  				if (len < event.guestsCap) {
  					if (event.guests.indexOf(user) === -1){
		  				event.guests.push(user);
		  				event.save();
		  				res.json(event);
  					} else {
  						res.status(500).send('User is already attending!');
  					}
  				} else {
					res.status(500).send('Event is full!');
				}
  			} else {
  				res.status(500).send('Event not found');
  			}
  		});
  		
  	},
  	getEventsUserIsAttending: function(req, res, next) {
  		var user = req.params.name;

  		findAllEvents({guests: user}).then(function(events) {
  			if (events) {
  				res.json(events);
  			} else {
  				res.status(404).send('Events not found');
  			}
  		});
  	},

  	getEventUserIsHosting: function(req, res, next) {
  		var user = req.params.name;

  		findAllEvents({host: user}).then(function(events) {
  			if (events) {
  				res.json(events);
  			} else {
  				res.status(404).send('Events not found');
  			}
  		});
  	}


};