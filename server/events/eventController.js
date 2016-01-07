var Event = require('./eventModel.js');
    Q = require('q');
    util = require('../config/utils.js');

var createEvent = Q.nbind(Event.create, Event);
var findAllEvents = Q.nbind(Event.find, Event);

module.exports = {
	allEvents: function(req, res, next){
		findAllEvents({})
		.then(function(events){
			res.json(events);
		}).fail(function(error){
			next(error);
		})
	},

	addEvent: function(req, res, next){
		// var eventname = req.body.eventname;
		// var description = req.body.description;
		// var guestsCap = req.body.guestsCap;
		// var date = req.body.date;
		// var location = req.body.location;
		// var host = req.body.host;

		var eventname = 'Dinner party';
		var description = 'eating steak';
		var guestsCap = 7;
		var date = new Date('Jan 17, 2016');
		var location = "Albany";
		var host = 'Nick';
		var price = 10;

		createEvent({
			eventname: eventname,
			description: description,
			guestsCap: guestsCap,
			// date: date,
			location: location,
			host: host
		})
		.then(function(newEvent){
			res.json(newEvent);
		})
		.fail(function(error){
			next(error);
		});
	}
}