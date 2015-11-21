angular.module('orgunitmanager')
	.controller('editUnitCtrl', ['$scope', 'orgfactory', '$stateParams', function ($scope, orgfactory, $stateParams) {

		$scope.unitToEdit = {};

		angular.element('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15, // Creates a dropdown of 15 years to control year
			format: 'yyyy-mm-dd',
			formatSubmit: 'yyyy/mm/dd'
		});

		$scope.initEdit = function () {
			$scope.unitToEdit = $stateParams.unitCurrentDetails;
			angular.element('#org_opening_date').val($scope.unitToEdit.openingDate);
			angular.element('#org_closed_date').val($scope.unitToEdit.closedDate);
			console.log($stateParams.unitCurrentDetails);
		}

		$scope.editUnit = function () {
			var editUnitAsJSON = {
				code: $scope.unitToEdit.code,
				name: $scope.unitToEdit.name,
				shortName: $scope.unitToEdit.shortName,
				description: $scope.unitToEdit.description,
				comment: $scope.unitToEdit.comment,
				openingDate: $scope.unitToEdit.openingDate,
				closedDate: $scope.unitToEdit.closedDate,
				
				/*
				contactPerson: $scope.unitToEdit.contactPerson,
				contactAddress: $scope.unitToEdit.contactAddress,
				contactEmail: $scope.unitToEdit.contactEmail,
				contactPhone: $scope.unitToEdit.contactPhone*/
			}

			orgfactory.editOrgUnit($scope.unitToEdit.id, editUnitAsJSON)
				.success(function (result) {
					console.log(result);
					Materialize.toast('Success', 4000);
				});
		}

	}]);