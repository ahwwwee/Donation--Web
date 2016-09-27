const Donation = require('./app/controller/donation');
const Assets = require('./app/controller/assets');

module.exports = [

  { method: 'GET', path: '/', config: Donation.home },

  { method: 'GET', path: '/login', config: Donation.login, },

  { method: 'GET', path: '/signup', config: Donation.signup, },

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },
];
