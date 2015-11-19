var urlBase = "";

angular.module('orgunitmanager')
	.controller('orgunitCtrl', ['$scope', 'orgfactory', '$http', function ($scope, orgfactory, $http, uiGmapGoogleMapApi) {

		$scope.newOrg = {};
		
		//temporary map values for google maps
		$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
		
		//Enabling tabs in home
		angular.element('ul.tabs').tabs();
		angular.element('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15, // Creates a dropdown of 15 years to control year
			format: 'yyyy-mm-dd'
		});
		
		// Fetching base url + organisation units on document ready
		getBaseUrl();

		var pageData = {};
		var currentDetails;

		function getBaseUrl() {
			orgfactory.getBaseUrl().success(function (result) {
				urlBase = result.activities.dhis.href + "/api";
				getOrgunits();
			});
		}

		function getOrgunits() {
			orgfactory.getOrgUnits()
				.success(function (result) {
					console.log('Orgunits Loaded');
					$scope.orgunits = result.organisationUnits;
					pageData.page1 = result.organisationUnits;
                    $scope.numberOfPages = new Array(result.pager.pageCount);
                    $scope.activePage = 1;
					$scope.$broadcast('orgunitsloaded');
					uiGmapGoogleMapApi.then(function(maps) {

   					});
				})
				.error(function (error) {
					console.log('Unable to fetch organization units: ' + error);
				});
		}

		//save details on click? probably not necessary		
		$scope.getOrgDetails = function getOrgDetails(id) {
			if (currentDetails != id) {
				console.log(id);
				currentDetails = id;
				orgfactory.getOrgDetails(id)
					.success(function (result) {
						//Depending how the result works and which details we want.
						$scope.orgdetails = result;
					})
					.error(function (error) {
						console.log('Unable to get organization unit details: ' + error);
					});
			} else {
				console.log('Closing details');
			}
		};
		
		// Simjes pagenation - Merging
        $scope.goToPage = function (page) {
            $scope.activePage = page;
            if (pageData.hasOwnProperty('page' + page)) {
                $scope.orgunits = pageData['page' + page];
                $scope.$broadcast('orgunitsloaded');
            } else {
                orgfactory.getPageUnits(page)
					.success(function (result) {
						$scope.orgunits = result.organisationUnits;
						pageData['page' + page] = result.organisationUnits;
						$scope.$broadcast('orgunitsloaded');
					})
					.error(function (error) {
						console.log('Pagination fucked up: ' + error);
					});
            }
        }

		$scope.addNewUnit = function () {
			var newUnitAsJSON = {
				code: $scope.newOrg.code,
				name: $scope.newOrg.name,
				shortName: $scope.newOrg.shortName,
				openingDate: $scope.newOrg.openingDate,
				description: $scope.newOrg.description,
				comment: $scope.newOrg.comment,
				longitude: $scope.newOrg.longitude,
				latitude: $scope.newOrg.latitude,
				url: "" //$scope.newOrg.url
				/*
				contactPerson: $scope.newOrg.contactPerson,
				contactAddress: $scope.newOrg.contactAddress,
				contactEmail: $scope.newOrg.contactEmail,
				contactPhone: $scope.newOrg.contactPhone*/
			};
			console.log($scope.newOrg.openingDate);

			orgfactory.addOrgUnit(newUnitAsJSON)
				.success(function (result) {
					getOrgunits();
					$scope.newOrg = {};
					angular.element('ul.tabs').tabs('select_tab', 'search-window');
					Materialize.toast('Success', 4000);
				});
			}
			
			
			// uiGmapGoogleMapApi is a promise.
    		// The "then" callback function provides the google.maps object.
			
			
	}]);