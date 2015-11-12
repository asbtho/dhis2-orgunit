angular.module('orgunitmanager')
	.controller('orgunitCtrl', ['$scope', 'orgfactory', function ($scope, orgfactory) {
		
		//Enabling tabs in home
		angular.element('ul.tabs').tabs();
		accordion: false;
		
		$scope.orgunits;
		$scope.orgdetails;

		getOrgunits();

		function getOrgunits() {
			orgfactory.getOrgunits()
				.success(function (result) {
					console.log('Orgunits Loaded');
					$scope.orgunits = result.organisationUnits;
					$scope.$broadcast('orgunitsloaded');
				})
				.error(function (error) {
					console.log('Unable to fetch organization units: ' + error);
				});
		}

		$scope.getOrgDetails = function getOrgDetails(id) {
			console.log(id);
			orgfactory.getOrgDetails(id)
				.success(function (result) {
					//Depending how the result works and which details we want.
					$scope.orgdetails = result;
					$scope.$broadcast('orgunitsdetailsloaded');
				})
				.error(function (error) {
					console.log('Unable to get organization unit details: ' + error);
				});
		}

	}]);