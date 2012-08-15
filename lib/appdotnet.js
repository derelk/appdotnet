var request = require('request');

/**
 * Create a new AppDotNet object with `token`.
 *
 * @param {String} valid app.net access token
 * @return {Object} new object
 */

var AppDotNet = module.exports = function (token) {
  this.token = token;
};

/**
 * Convenience construtor for `AppDotNet`.
 *
 * @param {String} valid app.net access token
 * @return {Object} new object
 */

AppDotNet.create = function (token) {
  return (new AppDotNet(token));
};

/**
 * Create a valid authenticate uri with `params`.
 *
 * @param {Object} params for the get parameters
 * @return {String} uri
 */

AppDotNet.createAuthenticateUri = function (params) {
  var url = 'https://alpha.app.net/oauth/authenticate'
          + '?client_id=' + params.client_id
          + '&response_type=code'
          + '&redirect_uri=' + params.redirect_uri
          + '&scope=' + params.scope;
  return url;
};

/**
 * Request an access token with `params` and callback `cb(err, auth)`.
 *
 * @param {Object} params for the get parameters
 * @param {Function} cb
 */

AppDotNet.requestAccessToken = function (params, cb) {
  var opts = {
    uri: 'https://alpha.app.net/oauth/access_token',
    form: {
      'client_id': params.client_id,
      'client_secret': params.client_secret,
      'grant_type': 'authorization_code',
      'redirect_uri': params.redirect_uri,
      'code': params.code
    }
  };
  request.post(opts, function (err, resp, body) {
    var auth = JSON.parse(body);
    if (err) { return cb(err); }
    if (auth.error) { return cb(auth.error); }

    return cb(null, auth);
  });
};
