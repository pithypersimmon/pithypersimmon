# pithypersimmon


# EndPoints Overview

| Method        | Endpoint      | Description  |
| ------------- |:-------------:| ------------:|
| `POST` | /api/users/signedin | Send login data from google api to server to create new user in database or grab existing user |
| `GET` | /api/events | Returns all events in the database |
| `POST` | /api/events | All information is passed in via the inputs with the exception of username which should be the session.name |
| `GET` | /api/events/:id | Get an event based on its unique object id field that mongoDB provides by default |
| `GET` | /api/events/attending/:username | Return all events that a particular user is attending. Username must be passed in as the last part of the URL path. Username is obtained from accessing session.name. |
| `GET` | /api/events/hosting/:username | Return all events that a particular user is hosting. Username must be passed in as the last part of the URL path. Username is obtained from accessing session.name. |


# Schema's

### User Schema

    {
      IdToken: Number,
      name: String,
      imageUrl: String,
      email: String,
      events : Array,
      hostedEvents: Array
    }

### Event Schema

    {
	    description: String, //A description of the Event
	    title: String,		 //The Events Title
	    time: Date,			 //Time of event 
	    date: Date,			 //Date of event
	    guestsCap: Number,	 //The limit to the number of guests at the event
	    address: String,	 //Event's Address
	    city: String,		 //Event's City
	    state: String,		 //Event's State
	    zip: Number,		 //Event's Zip code
	    host: String		 //Name of the user hosting the event
    }

