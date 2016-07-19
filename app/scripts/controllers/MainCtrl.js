
/**
 * @ngdoc function
 * @name GitHubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the GitHubApp
 */

'use strict';

angular.module('GitHubApp')
	.controller('MainCtrl', ['$scope', '$q', 'GitHubService', function ($scope, $q, GitHubService) {

		$scope.userNotFound = false;    //flag if valid user was found
		$scope.repoNotFound = false;    //flag if user has repos
		$scope.generalError = false;    //flag for general errors
		$scope.loading = false;         //flag to control loading image during search

		//user to search
		$scope.userName = '';           //name of user to be searched

		//check if input field has new user name
		$scope.$watch('userName', function (newVal, oldVal) {
			if (oldVal !== newVal) {

				$scope.userData = '';
				$scope.userRepoData = '';
				$scope.userNotFound = false;
				$scope.repoNotFound = false;
				$scope.generalError = false;

				if (newVal !== '') {
					//we have a new value, get user data
					$scope.loadUser();
				}
			}
		});

		//init flags and load user data
		$scope.loadUser = function () {
			$scope.loading = true;

			//get user profile data
			GitHubService.getUserProfile($scope.userName)
				.then(function(response) {
					$scope.userData = response;
					//get user repo data
					return GitHubService.getUserRepos($scope.userName);
				}, function(response) {
					$scope.userNotFound = true;
					return $q.reject(response);
				})
				.then(function(response){
					$scope.userRepoData = response;
					if (Object.keys(response).length <= 0) {
						$scope.repoNotFound = true;
					}
				}, function(response) {
					$scope.repoNotFound = true;
					return $q.reject(response);
				})
				.catch(function(response) {
					if (!$scope.userNotFound) {
						$scope.generalError = true;
					}
					return;
				})
				.finally(function(){
					$scope.loading = false;
				});
		};
	}]);