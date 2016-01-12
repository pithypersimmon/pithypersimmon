'use strict';

describe('LinksController', function () {
  var $scope, $rootScope, createController, Events, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('foodbnb'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    Events = $injector.get('Events');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('eventCtrl', {
        $scope: $scope,
        Events: Events
      });
    };

  }));

  it('should have a data property on the $scope', function () {
    createController();
    expect($scope.data).to.be.an('object');
  });

  it('should call `Links.getAll()` when controller is loaded', function () {
    sinon.spy(Events, 'getAll');
    $httpBackend.expectGET('/api/events').respond(200);

    createController();
    $httpBackend.flush();

    expect(Events.getAll.called).to.equal(true);
    Events.getAll.restore();
  });

  it('should populate the data property after the call to `Links.getAll()`', function () {
    var mockEvents = [{},{},{}];
    $httpBackend.expectGET('/api/events').respond(mockEvents);

    createController();
    $httpBackend.flush();

    expect($scope.data.events).to.deep.equal(mockEvents);
  });
});