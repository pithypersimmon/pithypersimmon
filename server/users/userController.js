var User = require('./userModel.js');
    Q = require('q');
    jwt = require('jwt-simple');

var session = require("../session")

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);

module.exports = {
  //** Step after Google OAuth Login. Google response data will be in req
  signin: function (req, res, next) {
    console.log("REQUEST", req.body)
    var IdToken = req.body.IdToken;
    var name = req.body.name;
    var imageUrl = req.body.imageUrl;
    var email = req.body.email;

    session.name = req.body.name;
    session.imageUrl = req.body.imageUrl;
    session.email = req.body.email;
    session.loggedIn = true;


    //** Queries Database and looks for User
    findUser({IdToken: IdToken})
      .then(function (user) {
        //** If user does not exist in the database, create a new user with properties
        if (!user) {
          return createUser({
            IdToken: IdToken,
            name: name,
            imageUrl: imageUrl
          });
        } else {
          //** if User exists, pass user on to .then promise
          return user
        }
      })
      .then(function (user) {
      //** create token to send back for auth. Jwt is a JSON Web Toke Encoder
        var token = jwt.encode(user, 'secret');
        res.json({
          token: token,
          name: name,
          imageUrl: imageUrl,
          email: email
        });
      })
      .fail(function (error) {
        next(error);
      });
  },


  checkAuth: function(req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      findUser({email: user.email})
        .then(function (foundUser) {
          if (foundUser) {
            res.json({ auth: true});
          } else {
            res.json({ auth: false});
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};
