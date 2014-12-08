var fbNode;

(function() {
    'use strict';

    fbNode = angular.module('fbNodeApp', [
        'ngRoute',
        'ngResource',
        'ngCookies',
        'ngSanitize',
        'firebase'
    ]);

    fbNode.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'index.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

}());
