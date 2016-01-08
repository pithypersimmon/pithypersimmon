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
		

		createEvent({
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
	}
}