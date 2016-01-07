var User = require('./userModel.js');
    Q = require('q');
    jwt = require('jwt-simple');

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);

module.exports = {
  //** Step after Google OAuth Login. Google response data will be in req
  signin: function (req, res, next) {
    var username = req.body.username;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    //** Queries Database and looks for User
    findUser({username: username})
      .then(function (user) {
        //** If user does not exist in the database, create a new user with properties
        if (!user) {
          return createUser({
            username: username,
            first_name: first_name,
            last_name: last_name
          });
        } else {
          //** if User exists, pass user on to .then promise
          return user
        }
      })
      .then(function (user) {
      //** create token to send back for auth. Jwt is a JSON Web Toke Encoder
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
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
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};
