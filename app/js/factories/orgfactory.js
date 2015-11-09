angular.module('orgunitmanager.orgList')
	.factory('orgfactory', ['$http', function ($http) {
		
		var urlBase = angular.element.$location + '/api'; //What did simon use to get baseurl?
		var orgfactory = {};
		
		
		// This should return .json file of organisationUnits
		orgfactory.getOrgunits = function () {
			return $http.get(urlBase + '/organisationUnits.json');
		}
		
		// Should return details about the organisation unit
		// via the id referenced in the .json file from above function
		orgfactory.getOrgDetails = function (id) {
			return $http.get(urlBase + '/organisationUnits/' + id + '.json');
		}
		
		return orgfactory;
	}]);