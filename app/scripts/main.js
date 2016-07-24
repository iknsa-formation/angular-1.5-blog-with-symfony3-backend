'use strict';

var blog = angular.module('blog', ['ngRoute']); // jshint ignore:line

blog.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'BlogListingCtrl',
            templateUrl: 'templates/blogs.html'
        }).when('/:id', {
            controller: 'BlogShowCtrl',
            templateUrl: 'templates/blog.html'
        })
    ;
}]);

blog.controller('BlogListingCtrl', ['$scope', function($scope) {
}]);

blog.controller('BlogShowCtrl', ['$scope', function($scope) {
}]);
