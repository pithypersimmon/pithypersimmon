# FoodBnB 
**Greenfield (origin) Authors:** Joey Leung, David Song, Nick Kneafsey, and Joshua Huang
> The concept of our greenfield project was to create an airbnb for food. People that like to cook or want to make a couple extra bucks can host meals they cook at their pad. People looking for a homecooked meal will be able to see these hosted dinners and grab a bite to eat. Our project is currently built on a full MEAN stack with google OAUTH OpenId connect as the login.

# RESTful Routes Endpoints Overview

| Method        | Endpoint      | Description  |
| ------------- |:-------------:| ------------:|
| `POST` | /api/users/signedin | Send login data from google api to server to create new user in database or grab existing user |
| `GET` | /api/events | Returns all events in the database |
| `POST` | /api/events | All information is passed in via the inputs with the exception of username which is in local storage |
| `GET` | /api/events/:id | Get an event based on its unique object id field that mongoDB provides by default |
| `GET` | /api/events/attending/:username | Return all events that a particular user is attending. Username must be passed in as the last part of the URL path. |
| `GET` | /api/events/hosting/:username | Return all events that a particular user is hosting. Username must be passed in as the last part of the URL path.  |

# Angular Routes

| Endpoint        | templateUrl      | controller  |
| ------------- |:-------------:| ------------:|
| `/` | ** redirectTo: "/splash" | n/a |
| `/login` | app/auth/login.html | authCtrl |
| `/splash` | app/splash/splash.html | splashCtrl |
| `/host` | app/host/host.html | hostCtrl |
| `/guest` | app/guest/guest.html | guestCtrl |
| `/events` | app/event/event.html | eventCtrl |
| `n/a` | ** redirectTo: "/splash" | n/a |


# Login

### Google OAuth OpenId Connect
Log in is handled by Google's OpenId Connect System. The log in button lives on the index and google serves a javascript callback and activates onSignIn after sucessful signin. User data is then passed into the server via a post request which queries the database of the user or creates them. This user data is passed to JWT to be tokenized before being passed back to the client side to be stored as a session.

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

# Server Side Controllers
### User Controller

| Function        |  Description  |
| ------------- |------------:|
| `signin` | Takes in req data from google login and looks for the user or create a new user in the database. Creates a JWT token and send it back to the client |
| `checkAuth` | Takes in a token and detokenizes the data to return the user data. It then queries the database for that user |

### Event Controller

| Function        |  Description  |
| ------------- |------------:|
| `allEvents` | Makes a db query to find all events |
| `addEvent` | Takes in req form data and adds a new event to the database |
| `oneEvent` | Takes in a id and searches the database for an event by id |
| `addUserToEvent` | Takes in an id Param and user data. Queries the database for the event by Id and pushes the user to its guests property |
| `getEventsUserIsAttending` | Takes in user data and queries all Events where user is in the guests array |
| `getEventUserIsHosting` | Takes in user data and queries all Events where user is in the host property |
