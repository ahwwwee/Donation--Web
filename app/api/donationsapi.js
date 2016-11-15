'use strict';

const Donation = require('../models/donation');
const Boom = require('boom');

exports.findAllDonations = {

  auth: false,

  handler: function (request, reply) {
    Donation.find({}).populate('donor').populate('candidate').then(donations => {
      reply(donations);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },
};

exports.findDonations = {

  auth: false,

  handler: function (request, reply) {
    Donation.find({ candidate: request.params.id }).then(donations => {
      reply(donations);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

exports.makeDonation = {

  auth: false,

  handler: function (request, reply) {
    const donation = new Donation(request.payload);
    console.log(request.params.id)
    donation.candidate = request.params.id;
    donation.save().then(newDonation => {
      reply(newDonation).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('error making donation'));
    });
  },

};

exports.deleteCandidateDonations = {

  auth: false,

  handler: function (request, reply) {
    Donation.find({ candidate: request.params.id }).then(donations => {
      for (let i = 0; i < donations.length; i++) {
        donations[i].remove();
      }
      reply(donations)
    }).catch(err => {
      reply(Boom.badImplementation('Could not find any donations to delete'));
    });
  },

};

exports.deleteAllDonations = {

  auth: false,

  handler: function (request, reply) {
    Donation.remove({}).then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing Donations'));
    });
  },

};
