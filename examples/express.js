/**
 * Example use of this library together with express, but just the token generation part.
 *
 * Be sure to fill in all the details in the config object below and install express v3.
 *
 * Also, be sure to setup the correct redirect_uri. This server will listen on 
 * localhost:3000/cb for the code response.
 */
var config = {
  client_id: '',
  client_secret: '',
  redirect_uri: '',
  scope: ''
};

/**
 * Require dependencies
 */

var AppDotNet = require('./'),
    util = require('util'),
    express = require('express');

/** 
 * Create and configure server and two easy routes.
 */

var app = express();

app.configure(function () {
  app.use(express.query());

  app.get('/', function (req, res) {
    var uri = AppDotNet.createAuthenticateUri(config);
    res.redirect(uri);
  });

  app.get('/cb', function (req, res) {
    config.code = req.query.code;
    AppDotNet.requestAccessToken(config, function (err, auth) {
      if (err) { return res.send(util.inspect(err)); }
      res.send('access token: ' + auth.access_token);
    });
  });
});

app.listen(3000);
