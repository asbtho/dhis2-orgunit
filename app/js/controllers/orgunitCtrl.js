var urlBase = "";

angular.module('orgunitmanager')
	.controller('orgunitCtrl', ['$scope', 'orgfactory', '$state', function ($scope, orgfactory, $state) {
		
		$scope.orgLevels = {};
		$scope.orgGroups = {};
		
		//flytt til link - directive?		
		angular.element('ul.tabs').tabs();
				
		// Fetching base url + organisation units on document ready
		getBaseUrl();

		var pageData = {};
		var currentDetails;

		function getBaseUrl() {
			orgfactory.getBaseUrl().success(function (result) {
				urlBase = result.activities.dhis.href + "/api";
				populateSite();
			});
		}

		function populateSite() {
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
				
			orgfactory.getLevels().success(function (result) {
				$scope.orgLevels = result.organisationUnitLevels;
				$scope.$broadcast('orgLevelsAndGroupsLoaded');
			})
			.error (function (error) {
				console.log(error);
			});
			
			orgfactory.getGroups().success(function (result) {
				$scope.orgGroups = result.organisationUnitGroups;
				$scope.$broadcast('orgLevelsAndGroupsLoaded');
			})
			.error (function (error) {
				console.log(error);
			});
		}

		$scope.setInitState = function() {
			$state.go('home.search');
		}

		//save details on click? probably not necessary		
		$scope.getOrgDetails = function getOrgDetails(id) {
			if (currentDetails != id) {
				currentDetails = id;
				orgfactory.getOrgDetails(id)
					.success(function (result) {
						//Depending how the result works and which details we want.
						$scope.orgdetails = result;
					})
					.error(function (error) {
						console.log('Unable to get organization unit details: ' + error);
					});
			}
		};
		
		// Simjes pagenation - Merging, needs fixing for saved data ??? also choose # of items on each page, dynamic paging
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

		$scope.editOrgDetails = function (currentDetails) {
			$state.go('home.edit', {unitCurrentDetails: currentDetails});
		}
				
		$scope.goToState = function (stateName) {
			switch (stateName) {
				case 'search':
					$state.go('home.search');
					break;
				case 'add':
					$state.go('home.add');
					break;
			}
		}
	}]);