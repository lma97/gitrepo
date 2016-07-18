'use strict';

/**
 * @ngdoc overview
 * @name githubApp
 * @description
 * # GitHubApp
 *
 * Main module of the application.
 */


var app = angular.module("GitHubApp", ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  });
