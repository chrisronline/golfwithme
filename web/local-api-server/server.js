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

var playDates = [
  {
    id: 1,
    date: moment.utc('2014-08-29T8:00:00-04:00', 'YYYY-MM-DDTHH:mm:ssZ'),
    location: 'Shadow Lake Executive Course',
    players: [1, 2],
    maxPlayers: 4
  }
];

var users = [
  {
    id: 1,
    firstName: 'Chris',
    lastName: 'Roberson',
    handicap: 12,
    profilePicture: 'https://scontent-a-lga.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10525768_10100948287381525_6706704909085261629_n.jpg?oh=3d1e539989b3d650e1d9d7d63a19af4c&oe=546F06C4'
  },
  {
    id: 2,
    firstName: 'Ryan',
    lastName: 'Gimmy',
    handicap: 18,
    profilePicture: 'https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xaf1/t1.0-9/426813_10100839529433143_1443819990_n.jpg'
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
