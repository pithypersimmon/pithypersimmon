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

  it('Should have /splash route, template, and controller', function () {
    expect($route.routes['/splash']).to.be.defined;
    expect($route.routes['/splash'].controller).to.equal('splashCtrl');
    expect($route.routes['/splash'].templateUrl).to.equal('app/splash/splash.html');
  });

  it('Should have /host route, template, and controller', function () {
    expect($route.routes['/host']).to.be.defined;
    expect($route.routes['/host'].controller).to.equal('hostCtrl');
    expect($route.routes['/host'].templateUrl).to.equal('app/host/host.html');
  });

  it('Should have /events route, template, and controller', function () {
    expect($route.routes['/events']).to.be.defined;
    expect($route.routes['/events'].controller).to.equal('eventCtrl');
    expect($route.routes['/events'].templateUrl).to.equal('app/event/event.html');
  });
});