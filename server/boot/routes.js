'use strict';

module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/api/ping', function(req, res) {
    res.send('pong');
  });
}