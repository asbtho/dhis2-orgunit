var urlBase = "";

angular.module('orgunitmanager')
	.controller('orgunitCtrl', ['$scope', 'orgfactory', '$http', function ($scope, orgfactory, $http) {
		
		//Enabling tabs in home
		angular.element('ul.tabs').tabs();
		angular.element('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15 // Creates a dropdown of 15 years to control year
		});

		//????????????????
		//$scope.orgunits;
		//$scope.orgdetails;
		
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
				})
				.error(function (error) {
					console.log('Unable to fetch organization units: ' + error);
				});
		}

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
			console.log('adding unit');
			var tst = {
				code: "OU_651071",
				name: "Adonkia CHP",
				shortName: "Adonkia CHP",
				openingDate: "2010-01-01",
				description: "lel",
				comment: "stuff",
				longitude: "233",
				latitude: "553",
				href: "lel.com"
			};
			orgfactory.addOrgUnit(tst)
				.success(function (result) {
					console.log(result);
				});
		}
	}]);