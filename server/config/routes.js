var passport = require('passport');
var eventController = require('../events/eventController.js');
var userController = require('../users/userController.js')
var helpers = require('./helpers.js');

module.exports = function(app, express){
  app.get('/', function(req, res){
    res.render('index');
  });

  app.get('/login', function(req, res){
    res.send(200, 'login');
  });

  app.get('/logout',function(req, res){
    req.logout();
    res.redirect('/login');
  });

  app.post('/api/users/signin', userController.signin);
  app.get('/api/users/signedin', userController.checkAuth);

  app.get('/api/events', eventController.allEvents);
  app.post('/api/events', eventController.addEvent);
  app.get('/api/events/:id', eventController.oneEvent);
}