(function() {
    'use strict';

    fbNode.controller('basicController', function ($scope, $firebase) {

        var ref = new Firebase("https://nodejs-express-demo.firebaseio.com/item");
        // create an AngularFire reference to the data
        var sync = $firebase(ref);
        // download the data into a local object
        $scope.items = sync.$asObject();

        $scope.addItems = function(text) {
            $scope.items.$add({author: text});
        }

    });

    fbNode.controller('twitterController', function ($scope, $firebase) {

        var twitter = new Firebase("https://nodejs-express-demo.firebaseio.com/twitter/username/rsschouwenaar");
        // create an AngularFire reference to the data
        var sync = $firebase(twitter);

        $scope.twitter = sync.$asObject();

    });

}());