angular.module('orgunitmanager')
	.factory('orgfactory', ['$http', function ($http) {		
		
		var orgfactory = {};
		
		orgfactory.getBaseUrl = function () {
			return $http.get('manifest.webapp');
		}
		
		// This should return .json file of organisationUnits
		orgfactory.getOrgUnits = function () {
			//include long og lati for insta markers på map?
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
		
		orgfactory.editOrgUnit = function (id, editOrgUnit) {
			return $http.patch(urlBase + '/organisationUnits/' + id , editOrgUnit);
		}
		
		orgfactory.getLevels = function () {
			return $http.get(urlBase + '/organisationUnitLevels.json?fields=name,level');
		}
		
		orgfactory.getGroups = function () {
			return $http.get(urlBase + '/organisationUnitGroups.json');
		}
		
		orgfactory.getSearchResults = function (parameters) {
			return $http.get(urlBase + '/organisationUnits.json?' + parameters);
		}

		return orgfactory;
	}]);