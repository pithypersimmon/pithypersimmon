var express = require('express');
var mongoose = require('mongoose');

var app = express();
var PORT = process.env.port || 8080;


//connect to mongoose
mongoose.connect(process.env.DB || 'mongodb://localhost/foodbnb');

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(PORT, function(){
	console.log('Listening on port '+ PORT);
});

module.exports = app;