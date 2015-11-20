angular.module('orgunitmanager')
	.controller('editUnitCtrl', ['$scope', 'orgfactory', '$stateParams', function ($scope, orgfactory, $stateParams) {
		
		$scope.unitToEdit = {};
		
		angular.element('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15, // Creates a dropdown of 15 years to control year
			format: 'yyyy-mm-dd'
		});
		
		$scope.initEdit = function () {
			$scope.unitToEdit = $stateParams.unitCurrentDetails;
			angular.element('#org_opening_date').val($scope.unitToEdit.openingDate);
			angular.element('#org_closed_date').val($scope.unitToEdit.closedDate);
			console.log($stateParams.unitCurrentDetails);
		}
		
		$scope.editUnit = function () {
			console.log($scope.unitToEdit);
		}
		
	}]);