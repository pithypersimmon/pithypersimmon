var Event = require('./eventModel.js');
    Q = require('q');
    util = require('../config/utils.js');

var createEvent = Q.nbind(Event.create, Event);
var findAllEvents = Q.nbind(Event.find, Event);
var findAnEvent = Q.nbind(Event.findOne, Event);

var seedData = [
  {
    title: 'Event1',
    description: 'Event2 desc',
    time: '1970-01-01T20:12:00.000Z',
    date: '2020-01-01T08:00:00.000Z',
    guestsCap: '2',
    address: '123 Main ST',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107'
  },
  {
    title: 'Event2',
    description: 'Event2 desc',
    time: '1970-01-01T20:12:00.000Z',
    date: '2020-01-01T08:00:00.000Z',
    guestsCap: '5',
    address: '321 Main ST',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107'
  },
  {
		title: 'Event3',
		description: 'Event3 desc',
		time: '1970-01-01T20:12:00.000Z',
		date: '2020-01-01T08:00:00.000Z',
		guestsCap: '10',
		address: 'ABC Main ST',
		city: 'San Francisco',
		state: 'CA',
		zip: '94107'
  }
];

module.exports = {
  allEvents: function(req, res, next){
    findAllEvents({})
    .then(function(events){
      if(events.length === 2) {
        for(var i = 0; i < seedData.length; i ++) {
        	console.log('hey now: ', seedData[i]);
        	createEvent(seedData[i]);
        };
      }
      console.log(events);
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
  						res.send(500).send('User is already attending!')
  					}
  				} else {
					res.send(500).send('Event is full!');
				}
  			} else {
  				res.send(500).send('Event not found');
  			}
  		});
  		
  	}

}