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
  },
  {
    id: 2,
    name: 'Pebble Beach',
    holes: 18,
    yardage: 7500,
    scorecard: [
    ]
  }
];

var inboundRequests = [
  {
    id: 1,
    outingId: 1,
    player: 1,
    date: moment().add(_.random(0, 100), 'days'),
    message: 'Can I join please bros?'
  }
];

var outboundRequests = [
  {
    id: 1,
    outingId: 1,
    from: 1,
    to: 2,
    date: moment().add(_.random(0, 100), 'days'),
    message: 'Wanna play bro?'
  }
];

var events = [
  {
    id: 1,
    ns: 'outing',
    type: 'CREATE',
    date: moment().add(_.random(0, 100), 'days'),
    message: null,
    userId: 1
  },
  {
    id: 2,
    ns: 'outing',
    type: 'REQUEST_JOIN',
    date: moment().add(_.random(0, 100), 'days'),
    message: 'I want to join!',
    userId: 2
  },
  {
    id: 3,
    ns: 'outing',
    type: 'REQUEST_ACCEPT',
    date: moment().add(_.random(0, 100), 'days'),
    message: 'Sure man!',
    userId: 1,
    acceptedUserId: 2
  }
];

var messages = [
  {
    id: 1,
    userId: 1,
    message: 'Hey man - you cool with this?'
  },
  {
    id: 2,
    userId: 3,
    message: 'You suck Tiger. You are like 40'
  },
  {
    id: 3,
    userId: 4,
    message: 'Yup you are right :('
  }
];

var outings = [
  {
    id: 1,
    date: moment().add(_.random(0, 100), 'days'),
    location: 1,
    players: [1, 2],
    maxPlayers: 4,
    inboundRequests: [],
    outboundRequests: [],
    events: [1,2,3],
    messages: [1]
  },
  {
    id: 2,
    date: moment().add(_.random(0, 100), 'days'),
    location: 2,
    players: [3, 4],
    maxPlayers: 3,
    messages: [2,3]
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

var loggedInUserId = 1;

function formatOuting(outing) {
  var copy = _.clone(outing);

  copy.outboundRequests = _.map(copy.outboundRequests, function(id) {
    return _.find(outboundRequests, { id: id });
  });
  copy.inboundRequests = _.map(copy.inboundRequests, function(id) {
    return _.find(inboundRequests, { id: id });
  });
  copy.location = _.find(locations, { id: copy.location });
  copy.events = _.map(copy.events, function(eventId) {
    return _.find(events, { id: eventId });
  });
  copy.messages = _.map(copy.messages, function(messageId) {
    return _.find(messages, { id: messageId });
  });

  return copy;
}

var api = '/api/v1';
// app.post(api + '/find', function(req, res) {
//   var data = _.mapValues(req.body, function(value, key) {
//     if (key === 'when') {
//       return moment(value);
//     }
//     return value;
//   })

//   var matches = [];
//   _.each(outings, function(outing) {
//     console.log('outing date', outing.date.format());
//     console.log('when', data.when.format());
//     if (outing.date.isSame(data.when, 'day')) {
//       matches.push(formatouting(outing));
//     }
//   });

//   res.send({data:{matches: matches}});
// });

app.get(api + '/schedule', function(req, res) {
  var now = moment().subtract(1, 'hour');
  var schedule = [];
  _.each(outings, function(outing) {
    schedule.push(formatOuting(outing));
  });
  res.send(schedule);
});

app.get(api + '/outing/:id', function(req, res) {
  var outing = _.find(outings, {id:parseInt(req.params.id)});
  res.send(formatOuting(outing));
});
app.post(api + '/outing/invite', function(req, res) {
  var invited = parseInt(req.body.to);
  var outing = _.find(outings, {id: req.body.outingId });
  var request = {
    id: 2,
    outingId: parseInt(req.body.outingId),
    from: 1,
    to: invited,
    date: moment().add(_.random(0, 100), 'days'),
    message: 'Wanna play bro?'
  };
  outboundRequests.push(request);
  outing.outboundRequests.push(request.id);
  res.send(formatOuting(outing));
});

app.get(api + '/account/:accountId', function(req, res) {
  var account = _.find(users, { id: parseInt(req.params.accountId) });
  res.send(account);
});

app.post(api + '/find/players', function(req, res) {
  var query = req.body.query.toLowerCase();
  var foundUsers = _.filter(users, function(user) {
    if (user.firstName.toLowerCase().indexOf(query) > -1  || user.lastName.toLowerCase().indexOf(query) > -1) {
      return true;
    }
    return false;
  });
  res.send(foundUsers);
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
