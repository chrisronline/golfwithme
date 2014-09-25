var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var qs = require('querystring');
var jwt = require('jwt-simple');
var moment = require('moment');
// var config = require('./config.json');
var _ = require('lodash');
// var redisSrc = require('redis');
// var redis = redisSrc.createClient();

app.use(cors());
app.use(bodyParser.json());

var courses = [
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
    player: 4,
    date: moment().add(_.random(0, 100), 'days'),
    message: 'Can I join please bros?'
  }
];

var outboundRequests = [
  {
    id: 1,
    outingId: 1,
    from: 1,
    to: 3,
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
    date: moment().add(_.random(0, 100), 'days'),
    message: 'Hey man - you cool with this?'
  },
  {
    id: 2,
    userId: 3,
    date: moment().add(_.random(0, 100), 'days'),
    message: 'You suck Tiger. You are like 40'
  },
  {
    id: 3,
    userId: 4,
    date: moment().add(_.random(0, 100), 'days'),
    message: 'Yup you are right :('
  },
  { id: 4, userId: 2, date: moment().add(_.random(0, 100), 'days'), message: 'Sounds good' },
  { id: 5, userId: 1, date: moment().add(_.random(0, 100), 'days'), message: 'I want to test pagination' },
  { id: 6, userId: 1, date: moment().add(_.random(0, 100), 'days'), message: 'so chat more!' },
  { id: 7, userId: 2, date: moment().add(_.random(0, 100), 'days'), message: 'Dont fuck it up' },
  { id: 8, userId: 1, date: moment().add(_.random(0, 100), 'days'), message: 'When has that ever happened?' },
  { id: 9, userId: 2, date: moment().add(_.random(0, 100), 'days'), message: 'About 5 minutes ago' },
  { id: 10, userId: 1, date: moment().add(_.random(0, 100), 'days'), message: 'Nah that was Noelle typing' },
  { id: 11, userId: 2, date: moment().add(_.random(0, 100), 'days'), message: 'Sure' },
];

var outings = [
  {
    id: 1,
    date: moment().add(_.random(0, 100), 'days'),
    course: 1,
    players: [1, 2],
    maxPlayers: 4,
    inboundRequests: [1],
    outboundRequests: [1],
    events: [1,2,3],
    messages: [1,4,5,6,7,8,9,10,11]
  },
  {
    id: 2,
    date: moment().add(_.random(0, 100), 'days'),
    course: 2,
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

var api = '/api/v1';
var redisPrefix = 'gwm_';

app.get(api + '/schedule', function(req, res) {
  var now = moment().subtract(1, 'hour');
  var schedule = [];
  _.each(outings, function(outing) {
    schedule.push(outing);
  });
  res.send(schedule);
});

app.get(api + '/outing/:id', function(req, res) {
  var outing = _.find(outings, {id:parseInt(req.params.id)});
  res.send(outing);
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
  res.send(outing);
});

app.get(api + '/account/:accountId', function(req, res) {
  res.send(_.find(users, {id: parseInt(req.params.accountId)}));
});
app.get(api + '/message/:messageId', function(req, res) {
  res.send(_.find(messages, {id: parseInt(req.params.messageId)}));
});
app.get(api + '/event/:eventId', function(req, res) {
  res.send(_.find(events, {id: parseInt(req.params.eventId)}));
});
app.get(api + '/request/outbound/:requestId', function(req, res) {
  res.send(_.find(outboundRequests, {id: parseInt(req.params.requestId)}));
});
app.get(api + '/request/inbound/:requestId', function(req, res) {
  res.send(_.find(inboundRequests, {id: parseInt(req.params.requestId)}));
});
app.get(api + '/course/:courseId', function(req, res) {
  res.send(_.find(courses, {id: parseInt(req.params.courseId)}));
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
app.post(api + '/find/courses', function(req, res) {
  var query = req.body.query.toLowerCase();
  var foundCourses = _.filter(courses, function(course) {
    if (course.name.toLowerCase().indexOf(query) > -1) {
      return true;
    }
    return false;
  });
  res.send(foundCourses);
});

app.listen(3001, function() {
  console.log('Running on port 3001 with CORS enabled...');
});
