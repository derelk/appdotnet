appdotnet
=========

A wrapper for the app.net http stream api, following node idioms.



Current State
-------------

app.net's api is not yet stable and is incomplete. Right now, this module only supports authentication and user part of the api. Next one is posts.


See https://github.com/appdotnet/api-spec for the state of the official api.




Developers
----------

Please make sure to include unit tests, if you want to contribute to this project.

To run the unit tests, there are several steps to do:

  1. get an app.net access token with `scope=stream%20email%20write_post%20follow%20messages%20export`
  2. move `config.example.json` to `config.json` and insert access token  
  3. just type `npm test`

All tests run against the official app.net api, so be sure to have an internet connection. When tests are timing out, try to increase the `scripts.test -> --timeout` value in `package.json`.



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

### AppDotNet.version

Version of the used api.

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



Examples
--------

The following examples are generated from the unit testing code. If you want to se running examples, be sure to checkout the `examples` directory in this repository.

### TOC
   - [AppDotNet](#appdotnet)
     - [object.getUser()](#appdotnet-objectgetuser)
     - [object.followUser()](#appdotnet-objectfollowuser)
     - [object.unfollowUser()](#appdotnet-objectunfollowuser)
     - [object.listFollowing()](#appdotnet-objectlistfollowing)
     - [object.listFollowers()](#appdotnet-objectlistfollowers)
<a name=""></a>
 
<a name="appdotnet"></a>
### AppDotNet
<a name="appdotnet-objectgetuser"></a>
#### object.getUser()
returns a user object.

```js
client.getUser(config.user_id, function (err, user) {
  should.exist(user);
  should.not.exist(err);
  done();
});
```

returns an error when not authorized.

```js
errorClient.getUser(config.user_id, function (err, user) {
  should.not.exist(user);
  should.exist(err);
  done();
});
```

<a name="appdotnet-objectfollowuser"></a>
#### object.followUser()
returns a user object.

```js
client.followUser(config.user_id, function (err, user) {
  should.exist(user);
  should.not.exist(err);
  done();
});
```

returns an error when not authorized.

```js
errorClient.followUser(config.user_id, function (err, user) {
  should.not.exist(user);
  should.exist(err);
  done();
});
```

<a name="appdotnet-objectunfollowuser"></a>
#### object.unfollowUser()
returns a user object.

```js
client.unfollowUser(config.user_id, function (err, user) {
  should.exist(user);
  should.not.exist(err);
  done();
});
```

returns an error when not authorized.

```js
errorClient.unfollowUser(config.user_id, function (err, user) {
  should.not.exist(user);
  should.exist(err);
  done();
});
```

<a name="appdotnet-objectlistfollowing"></a>
#### object.listFollowing()
returns an error when not authorized.

```js
errorClient.listFollowing(config.user_id, function (err, users) {
  should.not.exist(users);
  should.exist(err);
  done();
});
```

<a name="appdotnet-objectlistfollowers"></a>
#### object.listFollowers()
returns an error when not authorized.

```js
errorClient.listFollowers(config.user_id, function (err, users) {
  should.not.exist(users);
  should.exist(err);
  done();
});
```