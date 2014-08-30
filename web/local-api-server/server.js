var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var qs = require('querystring');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config.json');
var _ = require('lodash');

app.use(cors());
app.use(bodyParser.json());

// app.post('/auth/facebook', function(req, res) {
//   var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
//   var graphApiUrl = 'https://graph.facebook.com/me';
//
//   var params = {
//     client_id: req.body.clientId,
//     redirect_uri: req.body.redirectUri,
//     client_secret: config.FACEBOOK_SECRET,
//     code: req.body.code
//   };
//
//   // Step 1. Exchange authorization code for access token.
//   request.get({ url: accessTokenUrl, qs: params }, function(error, response, accessToken) {
//     accessToken = qs.parse(accessToken);
//
//     // Step 2. Retrieve information about the current user.
//     request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(error, response, profile) {
//       res.send({ token: createJwtToken(profile) });
//     });
//   });
// });

var locations = [
  {
    id: 1,
    name: 'Shadow Lake',
    holes: 18,
    yardage: 7222,
    scorecard: [
      {
        blue: 344,
        white: 300,
        red: 275
      }
    ]
  }
];

var playRequests = [
  {
    id: 1,
    player: 1,
    date: moment().utc()
  }
];

var playDates = [
  {
    id: 1,
    date: moment().utc(),
    location: 'Shadow Lake Executive Course',
    players: [1, 2],
    maxPlayers: 4,
    playRequests: [1]
  },
  {
    id: 2,
    date: moment().utc(),
    location: 'Pebble Beach',
    players: [3,4],
    maxPlayers: 3
  }
];

var users = [
  {
    id: 1,
    firstName: 'Chris',
    lastName: 'Roberson',
    handicap: 12,
    profilePicture: 'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xfa1/v/t1.0-9/310765_842296633875_1725464266_n.jpg?oh=43013037aa43bb1146d08f63fd67a3a1&oe=547501A0&__gda__=1416353640_eb9f9e25f3659a369c61c6d579104ad7'
  },
  {
    id: 2,
    firstName: 'Ryan',
    lastName: 'Gimmy',
    handicap: 18,
    profilePicture: 'https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xaf1/t1.0-9/426813_10100839529433143_1443819990_n.jpg'
  },
  {
    id: 3,
    firstName: 'Rory',
    lastName: 'McIlroy',
    handicap: 0,
    profilePicture: 'http://blogs.kansas.com/lutz/files/2014/08/McIlroy.jpg'
  },
  {
    id: 4,
    firstName: 'Tiger',
    lastName: 'Woods',
    handicap: 0,
    profilePicture: 'http://www.golfpunkmag.com/wp-content/uploads/2014/05/tiger-woods-ea-sports.jpg'
  }
];

var api = '/api/v1';

app.post(api + '/find', function(req, res) {
  var data = _.mapValues(req.body, function(value, key) {
    if (key === 'when') {
      return moment(value);
    }
    return value;
  })

  var matches = [];
  _.each(playDates, function(playDate) {
    if (playDate.date.isSame(data.when, 'day')) {
      var copy = _.clone(playDate);
      copy.players = _.map(copy.players, function(playerId) {
        return _.find(users, { id: playerId });
      });
      _.each(copy.playRequests, function(playRequestId) {
        copy.playRequest = _.find(playRequests, { id: playRequestId });
      });
      matches.push(copy);
    }
  });

  res.send({data:{matches: matches}});
});

app.get(api + '/account/:accountId', function(req, res) {
  var account = _.find(users, { id: parseInt(req.params.accountId) });
  res.send(account);
});

// function createJwtToken(user) {
//   var payload = {
//     user: user,
//     iat: moment().valueOf(),
//     exp: moment().add(7, 'days').valueOf()
//   };
//   return jwt.encode(payload, config.TOKEN_SECRET);
// }

app.listen(3001, function() {
  console.log('Running on port 3001 with CORS enabled...');
});
