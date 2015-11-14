angular.module('orgunitmanager')
	.factory('orgfactory', ['$http', function ($http) {		
		
		var urlBase = "https://play.dhis2.org/demo/api"; 
		
		// This should work, but apparently not??!?
		/*$http.get('manifest.webapp').then(function (result) {
			return result.data.activities.dhis.href + "/api";
		});
		*/
		var orgfactory = {};
		
		
		// This should return .json file of organisationUnits
		orgfactory.getOrgunits = function () {
			return $http.get(urlBase + "/organisationUnits.json");
		}
		
		// Should return details about the organisation unit
		// via the id referenced in the .json file from above function
		orgfactory.getOrgDetails = function (id) {
			return $http.get(urlBase + '/organisationUnits/' + id + '.json');
		}

		return orgfactory;
	}]);