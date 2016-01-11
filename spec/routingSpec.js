'use strict';

describe('Routing', function () {
  var $route;
  beforeEach(module('foodbnb'));

  beforeEach(inject(function ($injector) {
    $route = $injector.get('$route');
  }));

  it('Should have /login route, template, and controller', function () {
    expect($route.routes['/login']).to.be.defined;
    expect($route.routes['/login'].controller).to.equal('authCtrl');
    expect($route.routes['/login'].templateUrl).to.equal('app/auth/login.html');
  });

  // it('Should have /signin route, template, and controller', function () {
  //   expect($route.routes['/signin']).to.be.defined;
  //   expect($route.routes['/signin'].controller).to.equal('AuthController');
  //   expect($route.routes['/signin'].templateUrl).to.equal('app/auth/signin.html');
  // });

  // it('Should have /links route, template, and controller', function () {
  //   expect($route.routes['/links']).to.be.defined;
  //   expect($route.routes['/links'].controller).to.equal('LinksController');
  //   expect($route.routes['/links'].templateUrl).to.equal('app/links/links.html');
  // });

  // it('Should have /shorten route, template, and controller', function () {
  //   expect($route.routes['/shorten']).to.be.defined;
  //   expect($route.routes['/shorten'].controller).to.equal('ShortenController');
  //   expect($route.routes['/shorten'].templateUrl).to.equal('app/shorten/shorten.html');
  // });
});