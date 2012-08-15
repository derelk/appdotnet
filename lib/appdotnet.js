var request = require('request');

/**
 * Create a new AppDotNet object with `token`.
 *
 * @param {String} token valid app.net access token
 * @return {Object} new object
 */

var AppDotNet = module.exports = function (token) {
  this.token = token;
};

/**
 * Host against which all request are made.
 */

AppDotNet.host = 'https://alpha-api.app.net';

/**
 * Version of the used api.
 */

AppDotNet.version = '/stream/0';

/**
 * Convenience construtor for `AppDotNet`.
 *
 * @param {String} token valid app.net access token
 * @return {Object} new object
 */

AppDotNet.create = function (token) {
  return (new AppDotNet(token));
};

/**
 * Create a valid authentication uri with `params`.
 *
 * @param {Object} params for the get parameters
 * @return {String} uri
 */

AppDotNet.createAuthenticationUri = function (params) {
  var url = AppDotNet.host + '/oauth/authenticate'
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
    uri: AppDotNet.host + '/oauth/access_token',
    form: {
      'client_id': params.client_id,
      'client_secret': params.client_secret,
      'grant_type': 'authorization_code',
      'redirect_uri': params.redirect_uri,
      'code': params.code
    }
  };
  request.post(opts, function (err, resp, body) {
    if (err) { return cb(err); }
    var auth = JSON.parse(body);
    if (auth.error) { return cb(auth.error); }

    return cb(null, auth);
  });
};

/**
 * Retrieve the user with the given `id` and callback `cb(err, user)`.
 *
 * @param {String} id
 * @param {Function} cb
 */

AppDotNet.prototype.getUser = function (id, cb) {
  var opts = {
    uri: AppDotNet.host + AppDotNet.version + '/users/' + id,
    headers: { 'Authorization': 'Bearer ' + this.token }
  };
  request.get(opts, function (err, resp, body) {
    if (err) { return cb(err); }
    var user = JSON.parse(body);
    if (user.error) { return cb(user.error); }
    return cb(null, user);
  });
};

/**
 * Follow a user with the given `id` and callback `cb(err, user)`.
 *
 * @param {String} id
 * @param {Function} cb
 */

AppDotNet.prototype.followUser = function (id, cb) {
  var opts = {
    uri: AppDotNet.host + AppDotNet.version + '/users/' + id + '/follow',
    headers: { 'Authorization': 'Bearer ' + this.token }
  };
  request.post(opts, function (err, resp, body) {
    if (err) { return cb(err); }
    var user = JSON.parse(body);
    if (user.error) { return cb(user.error); }
    return cb(null, user);
  });
};

/**
 * Unfollow a user with the given `id` and callback `cb(err, user)`.
 *
 * @param {String} id
 * @param {Function} cb
 */

AppDotNet.prototype.unfollowUser = function (id, cb) {
  var opts = {
    uri: AppDotNet.host + AppDotNet.version + '/users/' + id + '/follow',
    headers: { 'Authorization': 'Bearer ' + this.token }
  };
  request.del(opts, function (err, resp, body) {
    if (err) { return cb(err); }
    var user = JSON.parse(body);
    if (user.error) { return cb(user.error); }
    return cb(null, user);
  });
};

/**
 * List users a user is following with the given `id` and callback `cb(err, users)`.
 *
 * @param {String} id
 * @param {Function} cb
 */

AppDotNet.prototype.listFollowing = function (id, cb) {
  var opts = {
    uri: AppDotNet.host + AppDotNet.version + '/users/' + id + '/following',
    headers: { 'Authorization': 'Bearer ' + this.token }
  };
  request.get(opts, function (err, resp, body) {
    if (err) { return cb(err); }
    var users = JSON.parse(body);
    if (users.error) { return cb(users.error); }
    return cb(null, users);
  });
};

/**
 * List users following a user with the given `id` and callback `cb(err, users)`.
 *
 * @param {String} id
 * @param {Function} cb
 */

AppDotNet.prototype.listFollowers = function (id, cb) {
  var opts = {
    uri: AppDotNet.host + AppDotNet.version + '/users/' + id + '/followers',
    headers: { 'Authorization': 'Bearer ' + this.token }
  };
  request.get(opts, function (err, resp, body) {
    if (err) { return cb(err); }
    var users = JSON.parse(body);
    if (users.error) { return cb(users.error); }
    return cb(null, users);
  });
};

/**
 * Check current access token and callback `cb(err, auth)`.
 *
 * @param {Function} cb
 */

AppDotNet.prototype.checkToken = function (cb) {
  var opts = {
    uri: AppDotNet.host + AppDotNet.version + '/token',
    headers: { 'Authorization': 'Bearer ' + this.token }
  };
  request.get(opts, function (err, resp, body) {
    if (err) { return cb(err); }
    var auth = JSON.parse(body);
    if (auth.error) { return cb(auth.error); }
    return cb(null, auth);
  });
};
