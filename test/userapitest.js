'use strict';

const assert = require('chai').assert;
const DonationService = require('./donation-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('User API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const donationService = new DonationService('http://localhost:4000');

  beforeEach(function () {
    donationService.deleteAllUsers();
  });

  afterEach(function () {
    donationService.deleteAllUsers();
  });

  test('create a user', function () {
    const returnedUser = donationService.createUser(newUser);
    assert(_.some([returnedUser], newUser),  'returnedUser must be a superset of newUser');
    assert.isDefined(returnedUser._id);
  });

  test('get user', function () {
    const c1 = donationService.createUser(newUser);
    const c2 = donationService.getUser(c1._id);
    assert.deepEqual(c1, c2);
  });

  test('get invalid user', function () {
    const c1 = donationService.getUser('1234');
    assert.isNull(c1);
    const c2 = donationService.getUser('012345678901234567890123');
    assert.isNull(c2);
  });

  test('delete a user', function () {
    const c = donationService.createUser(newUser);
    assert(donationService.getUser(c._id) != null);
    donationService.deleteOneUser(c._id);
    assert(donationService.getUser(c._id) == null);
  });

  test('get all users', function () {
    for (let c of users) {
      donationService.createUser(c);
    }

    const allUsers = donationService.getUsers();
    assert.equal(allUsers.length, users.length);
  });

  test('get users detail', function () {
    for (let c of users) {
      donationService.createUser(c);
    }

    const allUsers = donationService.getUsers();
    for (var i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), 'returnedUser must be a superset of newUser');
    }
  });

  test('get all Users empty', function () {
    const allUsers = donationService.getUsers();
    assert.equal(allUsers.length, 0);
  });
});
