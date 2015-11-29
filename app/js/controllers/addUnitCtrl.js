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
				//really the way so save lat and long?
				coordinates: "[" + $scope.newOrg.latitude + "," + $scope.newOrg.longitude + "]",
				url: $scope.newOrg.url,
				contactPerson: $scope.newOrg.contactPerson,
				address: $scope.newOrg.contactAddress,
				email: $scope.newOrg.contactEmail,
				phoneNumber: $scope.newOrg.contactPhone
			};

			orgfactory.addOrgUnit(newUnitAsJSON)
				.success(function (result) {
					$scope.newOrg = {};
					Materialize.toast('Success', 4000);
				});
		}

	}]);