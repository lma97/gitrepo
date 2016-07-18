
/**
 * @ngdoc function
 * @name GitHubApp.service:GitHubService
 * @description
 * # GitHubService
 * Service of the GitHubApp
 */

'use strict';

angular.module('GitHubApp')
	.service('GitHubService', ['$http', '$q', function ($http, $q) {

		// get profile data for a user
		this.getUserProfile = function (userName) {
			return $http.get('https://api.github.com/users/' + userName)
				.then(function(response) {
					return response.data;
				}, function(response) {
					return $q.reject(response.data);
				}
			);
		};

		// get repo data for a given user
		this.getUserRepos = function (userName) {
			return $http.get('https://api.github.com/users/' + userName + '/repos')
				.then(function (response) {
					return response.data;
				}, function(response) {
					return $q.reject(response.data);
				}
			);
		};
	}]);