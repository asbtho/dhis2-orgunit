angular.module('orgunitmanager')
	.factory('orgfactory', ['$http', function ($http) {		
		
		//var urlBase = "https://play.dhis2.org/demo/api"; 
		
		// This should work, but apparently not??!?
		/*$http.get('../manifest.webapp').then(function (result) {
			return result.activities.dhis.href + "/api";
		});*/
		
		var orgfactory = {};
		
		orgfactory.getBaseUrl = function () {
			return $http.get('manifest.webapp');
		}
		
		// This should return .json file of organisationUnits
		orgfactory.getOrgUnits = function () {
			return $http.get(urlBase + "/organisationUnits.json");
		}
		
		// Should return details about the organisation unit
		// via the id referenced in the .json file from above function
		orgfactory.getOrgDetails = function (id) {
			return $http.get(urlBase + '/organisationUnits/' + id + '.json');
		}
		
		orgfactory.getPageUnits = function(page) {
			return $http.get(urlBase + '/organisationUnits.json?page=' + page);
		}
		
		orgfactory.addOrgUnit = function(newOrgUnit) {
			return $http.post(urlBase + '/organisationUnits', newOrgUnit);
		}

		return orgfactory;
	}]);