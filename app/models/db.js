'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let dbURI = 'mongodb://homer:secret@ds061345.mlab.com:61345/donation';

mongoose.connect(dbURI);

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

mongoose.connection.on('connected', function () {
  if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
  }

  console.log('Mongoose connected to ' + dbURI);
  if (process.env.NODE_ENV != 'production') {
    var seeder = require('mongoose-seeder');
    const data = require('./initdata.json');
    const Donation = require('./donation');
    const User = require('./user');
    const Candidate = require('./candidate.js');
    seeder.seed(data, { dropDatabase: false, dropCollections: true }).then(dbData => {
      console.log('preloading Test Data');
    }).catch(err => {
      console.log(error);
    });
  }
});
