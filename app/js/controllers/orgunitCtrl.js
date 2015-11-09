angular.module('orgunitmanager')
	.controller('orgunitCtrl', ['$scope', 'orgfactory', function ($scope, orgfactory) {
		
		//Enabling tabs in home
		angular.element('ul.tabs').tabs();

		$scope.orgunits;
		$scope.orgdetails;

		getOrgunits();

		function getOrgunits() {
			console.log('i am being called');
			orgfactory.getOrgunits()
				.success(function (result) {
					$scope.orgunits = result.data.organisationUnits;
					$scope.$broadcast('orgunitsloaded');
				})
				.error(function (error) {
					console.log('Unable to fetch organization units: ' + error);
				});
		}

		function getOrgDetails(id) {
			orgfactory.getOrgDetails(id)
				.success(function (result) {
					//Depending how the result.data works and which details we want.
					$scope.orgdetails = result.data.dataSets;
					$scope.$broadcast('orgunitsdetailsloaded');
				})
				.error(function (error) {
					console.log('Unable to get organization unit details: ' + error);
				});
		}

	}]);