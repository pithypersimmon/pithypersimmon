'use strict';

describe('Services', function () {
  beforeEach(module('foodbnb.services'));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));


  describe('Events Factory', function () {
    var $httpBackend, Events;

    beforeEach(inject(function (_$httpBackend_, _Events_) {
      $httpBackend = _$httpBackend_;
      Events = _Events_;
    }));

    it('should exist', function () {
      expect(Events).to.exist;
    });

    it('should have a method `getAll`', function () {
      expect(Events.getAll).to.be.a('function');
    });

    it('should have a method `getHosting`', function () {
      expect(Events.getHosting).to.be.a('function');
    });

    it('should have a method `getAttending`', function () {
      expect(Events.getAttending).to.be.a('function');
    });

    it('should have a method `addOne`', function () {
      expect(Events.addOne).to.be.a('function');
    });

    it('should have a method `joinEvent`', function () {
      expect(Events.joinEvent).to.be.a('function');
    });

    it('should have a method `checkAddress`', function () {
      expect(Events.checkAddress).to.be.a('function');
    });

  });

});


