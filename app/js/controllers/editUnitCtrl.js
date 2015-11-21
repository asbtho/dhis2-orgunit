angular.module('orgunitmanager')
	.controller('editUnitCtrl', ['$scope', 'orgfactory', '$stateParams', '$state', function ($scope, orgfactory, $stateParams, $state) {

		$scope.unitToEdit = {};

		angular.element('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15, // Creates a dropdown of 15 years to control year
			format: 'yyyy-mm-dd',
			formatSubmit: 'yyyy/mm/dd'
		});

		$scope.initEdit = function () {
			$scope.unitToEdit = $stateParams.unitCurrentDetails;
			//temp fix? ng-model errors på date
			angular.element('#org_opening_date').val($scope.unitToEdit.openingDate);
			angular.element('#org_closed_date').val($scope.unitToEdit.closedDate);
		}

		$scope.editUnit = function () {
			var editUnitAsJSON = {
				code: $scope.unitToEdit.code,
				name: $scope.unitToEdit.name,
				shortName: $scope.unitToEdit.shortName,
				description: $scope.unitToEdit.description,
				comment: $scope.unitToEdit.comment,
				url: $scope.unitToEdit.url,
				openingDate: $scope.unitToEdit.openingDate,
				closedDate: $scope.unitToEdit.closedDate,
				contactPerson: $scope.unitToEdit.contactPerson,
				address: $scope.unitToEdit.address,
				email: $scope.unitToEdit.email,
				phoneNumber: $scope.unitToEdit.phoneNumber
			}

			orgfactory.editOrgUnit($scope.unitToEdit.id, editUnitAsJSON)
				.success(function (result) {
					$scope.unitToEdit = {};
					$state.go('home.search');
					Materialize.toast('Success', 4000);
				});
		}
	}]);