var express = require('express'),
    http = require('http'),
    app = express(),
    bodyParser = require('body-parser'),
    Twit = require('twit'),
    Firebase = require("firebase"),
    myFirebaseRef = new Firebase("https://nodejs-express-demo.firebaseio.com/"),
    FBtwitter = new Firebase("https://nodejs-express-demo.firebaseio.com/twitter"),
    FBtwUsername = new Firebase("https://nodejs-express-demo.firebaseio.com/twitter/username");



app.use(express.static(__dirname + '/html'));

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

});

//Firebase api
function saveObjTwitterToFB(req, obj, promise) {
    console.log('Data is saved to Firebase');
    FBtwUsername.child(req).update(obj, promise);
}




// Twitter api
var T = new Twit({
    consumer_key:         'hcYtx0R3HwkCGuFCMCqu43V0G',
    consumer_secret:      'PEEt6OVFsOI8T0g2ZWnOu9UUX8bJgVS7mFswxaY3vXGfUzPfYZ',
    access_token:         '168580860-uGyScXihhNEvSEWm3MOwpXlrZaPPLV5CbScBLyyc',
    access_token_secret:  'mxmWeJX8MWHjLEzu991mKgZv9iaCQlLb4J4bAIX7FAsFX'
});

var onComplete = function(error) {
    if (error) {
        console.log('Synchronization failed');
    } else {
        console.log('Synchronization succeeded');
    }
}

app.get('/twitter/:name', function (req, res) {
    T.get('search/tweets', { q: req.params.name, count: 1 }, function(err, data, response) {
        var userProfile, twitterSavedObj;

        userProfile = data.statuses[0].user;

        twitterSavedObj = {
            followers: userProfile.followers_count,
            screen_name: userProfile.screen_name,
            logo: userProfile.profile_image_url,
            banner: userProfile.profile_banner_url,
            profile_link_color: userProfile.profile_link_color,
            profile_text_color: userProfile.profile_text_color
        };

        saveObjTwitterToFB(req.params.name, twitterSavedObj, onComplete);

        FBtwUsername.on("value", function(snapshot) {
            console.log('Got the data');
            res.send(snapshot.val());
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    });
});


