/**
 * Created by Raymon on 4-12-2014.
 */
var express = require('express'),
    http = require('http'),
    app = express(),
    Firebase = require("firebase"),
    FBtwitter = new Firebase("https://nodejs-express-demo.firebaseio.com/twitter");


var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

});

var Twit = require('twit');

var T = new Twit({
    consumer_key:         'hcYtx0R3HwkCGuFCMCqu43V0G',
    consumer_secret:      'PEEt6OVFsOI8T0g2ZWnOu9UUX8bJgVS7mFswxaY3vXGfUzPfYZ',
    access_token:         '168580860-uGyScXihhNEvSEWm3MOwpXlrZaPPLV5CbScBLyyc',
    access_token_secret:  'mxmWeJX8MWHjLEzu991mKgZv9iaCQlLb4J4bAIX7FAsFX'
});


app.get('/', function (req, res) {
    T.get('search/tweets', { q: 'competait', count: 1 }, function(err, data, response) {
        //res.send('Hello World!');
        res.send(data.statuses[0].user);
    });
});

app.get('/timeline', function (req, res) {
    T.get('followers/ids', { screen_name: 'competait' },  function (err, data, response) {
        res.send(data);
    });
});