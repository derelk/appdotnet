appdotnet v0.1.2
================

A wrapper for the app.net http stream api, following node idioms.



Current State
-------------

app.net's api is not yet stable and is incomplete. Right now, this module supports all working parts of the official api (auth, user and post).


See https://github.com/appdotnet/api-spec for the state of the official api.




Developers
----------

Please make sure to include unit tests, if you want to contribute to this project.

To run the unit tests, there are several steps to do:

  1. get an app.net access token with `scope=stream%20email%20write_post%20follow%20messages%20export`
  2. move `config.example.json` to `config.json` and insert access token  
  3. just type `npm test`

All tests run against the official app.net api, so be sure to have an internet connection. When tests are timing out, try to increase the `scripts.test -> --timeout` value in `package.json`.

**Running this tests will result in automatic post creation, operation and deletion.** If you dislike this, be sure to remove the unit tests for object.createPost() and object.deletePost().



Examples
--------

The following examples are generated from the unit testing code. Be sure to checkout the complete api description at the bottom.

There are some applications already using this library, checkout https://npmjs.org/package/appdotcouch and https://npmjs.org/package/appdotauth.




### AppDotNet

#### AppDotNet.createAuthenticationUri()
returns an uriencoded string.

```js
var params = {
  client_id: '9ah9has9hsaf9hasf9hfsa9hfsa9hsafhhasoh',
  redirect_uri: 'http://localhost:3000/cb',
  scope: 'export write_post'
};

var expectedUri = AppDotNet.authHost
                + '/oauth/authenticate'
                + '?client_id=9ah9has9hsaf9hasf9hfsa9hfsa9hsafhhasoh'
                + '&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcb'
                + '&scope=export%20write_post'
                + '&response_type=code';

AppDotNet.createAuthenticationUri(params).should.equal(expectedUri);
```


#### object.getUser()
returns a user object.

```js
client.getUser(config.user_id, function (err, user) {
  should.exist(user);
  should.not.exist(err);
  done();
});
```

#### object.followUser()
returns a user object.

```js
client.followUser(config.user_id, function (err, user) {
  should.exist(user);
  should.not.exist(err);
  done();
});
```

#### object.unfollowUser()
returns a user object.

```js
client.unfollowUser(config.user_id, function (err, user) {
  should.exist(user);
  should.not.exist(err);
  done();
});
```

#### object.listFollowing()
returns an error when not authorized.

```js
errorClient.listFollowing(config.user_id, function (err, users) {
  should.not.exist(users);
  should.exist(err);
  done();
});
```

#### object.listFollowers()
returns an error when not authorized.

```js
errorClient.listFollowers(config.user_id, function (err, users) {
  should.not.exist(users);
  should.exist(err);
  done();
});
```

#### object.checkToken()
returns an auth object.

```js
client.checkToken(function (err, auth) {
  should.exist(auth);
  should.not.exist(err);
  done();
});
```

#### object.createPost()
returns a post object.

```js
client.createPost(config.post_data, function (err, post) {
  // save this for later use
  savedPostId = post.id;

  should.exist(post);
  should.not.exist(err);
  done();
});
```

#### object.retrievePost()
returns a post object.

```js
client.retrievePost(savedPostId, function (err, post) {
  should.exist(post);
  should.not.exist(err);
  done();
});
```

#### object.retrievePostReplies()
returns post objects.

```js
client.retrievePostReplies(savedPostId, {}, function (err, posts) {
  should.exist(posts);
  should.not.exist(err);
  done();
});
```

#### object.deletePost()
returns a post object.

```js
client.deletePost(savedPostId, function (err, post) {
  should.exist(post);
  should.not.exist(err);
  done();
});
```

#### object.retrieveCreatedPosts()
returns post objects.

```js
client.retrieveCreatedPosts(config.user_id, {}, function (err, posts) {
  should.exist(posts);
  should.not.exist(err);
  done();
});
```

#### object.retrieveMentions()
returns post objects.

```js
client.retrieveMentions(config.user_id, {}, function (err, posts) {
  should.exist(posts);
  should.not.exist(err);
  done();
});
```

#### object.retrievePersonalStream()
returns post objects.

```js
client.retrievePersonalStream({}, function (err, posts) {
  should.exist(posts);
  should.not.exist(err);
  done();
});
```

#### object.retrieveGlobalStream()
returns post objects.

```js
client.retrieveGlobalStream({}, function (err, posts) {
  should.exist(posts);
  should.not.exist(err);
  done();
});
```

#### object.retrieveTaggedPosts()
returns post objects.

```js
client.retrieveTaggedPosts(config.tag, {}, function (err, posts) {
  should.exist(posts);
  should.not.exist(err);
  done();
});
```



API
---

### AppDotNet()

Create a new AppDotNet object with `token`.

#### Params: 

* **String** *token* valid app.net access token

#### Return:

* **Object** new object

### AppDotNet.host

Host against which all request are made.

### AppDotNet.authHost

Host against which auth request are made.

### AppDotNet.create(token)

Convenience construtor for `AppDotNet`.

#### Params: 

* **String** *token* valid app.net access token

#### Return:

* **Object** new object

### AppDotNet.createAuthenticationUri(params)

Create a valid authentication uri with `params`.

#### Params: 

* **Object** *params* for the get parameters

#### Return:

* **String** uri

### AppDotNet.requestAccessToken(params, cb)

Request an access token with `params` and callback `cb(err, auth)`.

#### Params: 

* **Object** *params* for the get parameters

* **Function** *cb* 

### object.getUser(id, cb)

Retrieve the user with the given `id` and callback `cb(err, user)`.

#### Params: 

* **String** *id* 

* **Function** *cb* 

### object.followUser(id, cb)

Follow a user with the given `id` and callback `cb(err, user)`.

#### Params: 

* **String** *id* 

* **Function** *cb* 

### object.unfollowUser(id, cb)

Unfollow a user with the given `id` and callback `cb(err, user)`.

#### Params: 

* **String** *id* 

* **Function** *cb* 

### object.listFollowing(id, cb)

List users a user is following with the given `id` and callback `cb(err, users)`.

#### Params: 

* **String** *id* 

* **Function** *cb* 

### object.listFollowers(id, cb)

List users following a user with the given `id` and callback `cb(err, users)`.

#### Params: 

* **String** *id* 

* **Function** *cb* 

### object.checkToken(cb)

Check current access token and callback `cb(err, auth)`.

#### Params: 

* **Function** *cb* 

### object.createPost(data, cb)

Create a post with `data` and callback `cb(err, post)`.

#### Params: 

* **Object** *data* for the post

* **Function** *cb* 

### object.retrievePost(id, cb)

Retrieve a post with `id` and callback `cb(err, post)`.

#### Params: 

* **String** *id* of the post

* **Function** *cb* 

### object.retrievePostReplies(id, filters, cb)

Retrieve the replies to a post with `id` using `filters` and callback `cb(err, posts)`.

#### Params: 

* **String** *id* of a post

* **Object** *filters* 

* **Function** *cb* 

### object.deletePost(id, cb)

Delete a post with `id` and callback `cb(err, post)`.

#### Params: 

* **String** *id* of the post

* **Function** *cb* 

### object.retrieveCreatedPosts(id, filters, cb)

Retrieve posts created by a user with `id` using `filters` and callback `cb(err, posts)`.

#### Params: 

* **String** *id* of a user

* **Object** *filters* 

* **Function** *cb* 

### object.retrieveMentions(id, filters, cb)

Retrieve posts mentioning a user with `id` using `filters` and callback `cb(err, posts)`.

#### Params: 

* **String** *id* of a user

* **Object** *filters* 

* **Function** *cb* 

### object.retrievePersonalStream(filters, cb)

Retrieve logged in user's personalized stream using `filters` and callback `cb(err, posts)`.

#### Params: 

* **Object** *filters* 

* **Function** *cb* 

### object.retrieveGlobalStream(filters, cb)

Retrieve the global stream using `filters` and callback `cb(err, posts)`.

#### Params: 

* **Object** *filters* 

* **Function** *cb* 

### object.retrieveTaggedPosts(tag, filters, cb)

Retrieve tagged posts with `tag` using `filters` and callback `cb(err, posts)`.

#### Params: 

* **String** *tag* 

* **Object** *filters* 

* **Function** *cb* 

