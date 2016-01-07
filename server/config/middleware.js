
// var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var auth = require('./auth.js');

//hack beacuse passport uses google plus api
GoogleStrategy.prototype.userProfile = function(token, done) {
  done(null, {})
}


module.exports = function (app, express) {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '../client'));

  passport.use(new GoogleStrategy({
      clientID: auth.clientID,
      clientSecret: auth.clientSecret,
      callbackURL: auth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      console.log(profile);
      auth.accessToken = accessToken;
    }
  ));
};




