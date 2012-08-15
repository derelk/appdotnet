var AppDotNet = require('../'),
    should = require('should'),
    config = require('../config.json').test;

var client      = AppDotNet.create(config.access_token),
    errorClient = AppDotNet.create(''),
    savedPostId = null;

describe('AppDotNet', function () {
  describe('object.getUser()', function () {
    it('returns a user object', function (done) {
      client.getUser(config.user_id, function (err, user) {
        should.exist(user);
        should.not.exist(err);
        done();
      });
    });

    it('returns an error when not authorized', function (done) {
      errorClient.getUser(config.user_id, function (err, user) {
        should.not.exist(user);
        should.exist(err);
        done();
      });
    });
  });

  describe('object.followUser()', function () {
    it('returns a user object', function (done) {
      client.followUser(config.user_id, function (err, user) {
        should.exist(user);
        should.not.exist(err);
        done();
      });
    });

    it('returns an error when not authorized', function (done) {
      errorClient.followUser(config.user_id, function (err, user) {
        should.not.exist(user);
        should.exist(err);
        done();
      });
    });
  });

  describe('object.unfollowUser()', function () {
    it('returns a user object', function (done) {
      client.unfollowUser(config.user_id, function (err, user) {
        should.exist(user);
        should.not.exist(err);
        done();
      });
    });

    it('returns an error when not authorized', function (done) {
      errorClient.unfollowUser(config.user_id, function (err, user) {
        should.not.exist(user);
        should.exist(err);
        done();
      });
    });
  });

  describe('object.listFollowing()', function () {
    it('returns user objects', function (done) {
      client.listFollowing(config.user_id, function (err, users) {
        should.exist(users);
        should.not.exist(err);
        done();
      });
    });

    it('returns an error when not authorized', function (done) {
      errorClient.listFollowing(config.user_id, function (err, users) {
        should.not.exist(users);
        should.exist(err);
        done();
      });
    });
  });

  describe('object.listFollowers()', function () {
    it('returns user objects', function (done) {
      client.listFollowers(config.user_id, function (err, users) {
        should.exist(users);
        should.not.exist(err);
        done();
      });
    });

    it('returns an error when not authorized', function (done) {
      errorClient.listFollowers(config.user_id, function (err, users) {
        should.not.exist(users);
        should.exist(err);
        done();
      });
    });
  });

  describe('object.checkToken()', function () {
    it('returns an auth object', function (done) {
      client.checkToken(function (err, auth) {
        should.exist(auth);
        should.not.exist(err);
        done();
      });
    });

    it('returns an error when not authorized', function (done) {
      errorClient.checkToken(function (err, auth) {
        should.not.exist(auth);
        should.exist(err);
        done();
      });
    });
  });

  describe('object.createPost()', function () {
    it('returns a post object', function (done) {
      client.createPost(config.post_data, function (err, post) {
        // save this for later use
        savedPostId = post.id;

        should.exist(post);
        should.not.exist(err);
        done();
      });
    });

    it('returns an error when not authorized', function (done) {
      errorClient.createPost(config.post_data, function (err, post) {
        should.not.exist(post);
        should.exist(err);
        done();
      });
    });
  });

  describe('object.retrievePost()', function () {
    it('returns a post object', function (done) {
      client.retrievePost(savedPostId, function (err, post) {
        should.exist(post);
        should.not.exist(err);
        done();
      });
    });

    it('returns an error when not authorized', function (done) {
      errorClient.retrievePost(savedPostId, function (err, post) {
        should.not.exist(post);
        should.exist(err);
        done();
      });
    });
  });

  describe('object.deletePost()', function () {
    it('returns a post object', function (done) {
      client.deletePost(savedPostId, function (err, post) {
        should.exist(post);
        should.not.exist(err);
        done();
      });
    });

    it('returns an error when not authorized', function (done) {
      errorClient.deletePost(savedPostId, function (err, post) {
        should.not.exist(post);
        should.exist(err);
        done();
      });
    });
  });
});
