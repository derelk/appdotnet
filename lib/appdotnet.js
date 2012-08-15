var request = require('request'),
    objtoquery = require('objtoquery');

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

/**
 * Create a post with `data` and callback `cb(err, post)`.
 *
 * @param {Object} data for the post
 * @param {Function} cb
 */

AppDotNet.prototype.createPost = function (data, cb) {
  var opts = {
    uri: AppDotNet.host + AppDotNet.version + '/posts',
    headers: { 'Authorization': 'Bearer ' + this.token },
    form: data
  };
  request.post(opts, function (err, resp, body) {
    if (err) { return cb(err); }
    var post = JSON.parse(body);
    if (post.error) { return cb(post.error); }
    return cb(null, post);
  });
};

/**
 * Retrieve a post with `id` and callback `cb(err, post)`.
 *
 * @param {String} id of the post
 * @param {Function} cb
 */

AppDotNet.prototype.retrievePost = function (id, cb) {
  var opts = {
    uri: AppDotNet.host + AppDotNet.version + '/posts/' + id,
    headers: { 'Authorization': 'Bearer ' + this.token }
  };
  request.get(opts, function (err, resp, body) {
    if (err) { return cb(err); }
    var post = JSON.parse(body);
    if (post.error) { return cb(post.error); }
    return cb(null, post);
  });
};

/**
 * Delete a post with `id` and callback `cb(err, post)`.
 *
 * @param {String} id of the post
 * @param {Function} cb
 */

AppDotNet.prototype.deletePost = function (id, cb) {
  var opts = {
    uri: AppDotNet.host + AppDotNet.version + '/posts/' + id,
    headers: { 'Authorization': 'Bearer ' + this.token }
  };
  request.del(opts, function (err, resp, body) {
    if (err) { return cb(err); }
    var post = JSON.parse(body);
    if (post.error) { return cb(post.error); }
    return cb(null, post);
  });
};

/**
 * Retrieve the replies to a post with `id` using `filters` and callback `cb(err, posts)`.
 *
 * @param {String} id of a post
 * @param {Object} filters
 * @param {Function} cb
 */

AppDotNet.prototype.retrievePostReplies = function (id, filters, cb) {
  // do nasty stuff with the filters and create a string from that
  var opts = {
    uri: AppDotNet.host + AppDotNet.version + '/posts/' + id + '/replies' + objtoquery(filters),
    headers: { 'Authorization': 'Bearer ' + this.token }
  };
  request.get(opts, function (err, resp, body) {
    if (err) { return cb(err); }
    var posts = JSON.parse(body);
    if (posts.error) { return cb(posts.error); }
    return cb(null, posts);
  });
};
