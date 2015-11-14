angular.module('orgunitmanager')
	.controller('orgunitCtrl', ['$scope', 'orgfactory', '$http', function ($scope, orgfactory, $http) {
		
		//Enabling tabs in home
		angular.element('ul.tabs').tabs();
		// Angular site said to usually
		// set this to false, unsure why/what.
		accordion: false;

		$scope.orgunits;
		$scope.orgdetails;
		
		// Fetching organisation units on document ready
		getOrgunits();

		var apiBaseUrl = "";
		var pageData = {};

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
		};
		
		// Simjes pagenation - Merging
        $scope.goToPage = function (page) {
            $scope.activePage = page;
            if (pageData.hasOwnProperty('page' + page)) {
                $scope.data = pageData['page' + page];
                $scope.$broadcast('orgunitsloaded');
            } else {
                $http.get(apiBaseUrl + '/organisationUnits.json?page=' + page).then(function (result) {
                    $scope.data = result.data.organisationUnits;
                    pageData['page' + page] = result.data.organisationUnits;
                    $scope.$broadcast('orgunitsloaded');
                }, function (error) {
                    console.log(error);
                });
            }
        }
	}]);