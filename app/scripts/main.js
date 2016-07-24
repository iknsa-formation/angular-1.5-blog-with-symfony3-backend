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

blog.controller('BlogListingCtrl', ['$scope', '$http', function($scope, $http) {
    $http({
        method: 'GET',
        url: 'http://symfony.dev/api/post'
    }).then(function successCallback(response) {
        $scope.posts = response.data;
        console.log($scope.posts);
    }, function errorCallback(response) {
        console.log(response);
    });
}]);

blog.controller('BlogShowCtrl', ['$scope', function($scope) {
    $scope = '';
}]);
