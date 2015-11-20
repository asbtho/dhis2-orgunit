angular.module('orgunitmanager')
	.controller('addUnitCtrl', ['$scope', 'orgfactory', function ($scope, orgfactory) {
		
		$scope.newOrg = {};
		
		angular.element('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15, // Creates a dropdown of 15 years to control year
			format: 'yyyy-mm-dd'
		});
		
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

			orgfactory.addOrgUnit(newUnitAsJSON)
				.success(function (result) {
					
					$scope.newOrg = {};
					//----- broken -----
					//$state.go('home.search');
					//angular.element('ul.tabs').tabs('select_tab', 'search-window');
					//----- broken -----
					Materialize.toast('Success', 4000); 
				});
		}
		
	}]);