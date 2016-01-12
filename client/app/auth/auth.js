angular.module('foodbnb.auth', [])
.controller('authCtrl', function ($scope, Login) {
  $scope.data = {};

  // example code to check user auth
  // var checkUser = function() {
  //   Login.checkAuth()
  //     .then(function (data) {
  //       var user = JSON.parse(localStorage.getItem('user'));
  //       $scope.data.user = user;
  //       $scope.data.auth = data.auth;
  //     })
  //     .catch(function(error) {
  //       console.error(error);
  //     });
  // };
  // checkUser();
});