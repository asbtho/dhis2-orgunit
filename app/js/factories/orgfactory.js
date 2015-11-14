angular.module('orgunitmanager')
	.factory('orgfactory', ['$http', function ($http) {		
		
		//Not sure how to fetch the Url so i put it in as static.
		var urlBase = $http.get('manifest.webapp').then(function (result) {
			return result.activities.dhis.href + "/api";
		}); 
		
		//"https://play.dhis2.org/demo/api"; 
		
		
		/*
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
		
		orgfactory.getpageUnits = function(page) {
			return $http.get(urlBase + '/organisationUnits.json?page=' + page)
		}

		return orgfactory;
	}]);