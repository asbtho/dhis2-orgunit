angular.module('orgunitmanager')
	.controller('editUnitCtrl', ['$scope', 'orgfactory', '$stateParams', '$state', '$window', function ($scope, orgfactory, $stateParams, $state, $window) {

		$scope.unitToEdit = {};

		angular.element('.datepicker').pickadate({
			selectMonths: true,
			selectYears: 15,
			format: 'yyyy-mm-dd',
			formatSubmit: 'yyyy/mm/dd'
		});

		$scope.initEdit = function () {
			$scope.unitToEdit = $stateParams.unitCurrentDetails;

			if ($scope.unitToEdit.coordinates) {
				var coords = JSON.parse($scope.unitToEdit.coordinates);
				if (coords.length == 2) {
					$scope.unitToEdit.latitude = coords[0];
					$scope.unitToEdit.longitude = coords[1];
				}
			}
			
			//temp fix, ng-model errors på date
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
				coordinates: "[" + $scope.unitToEdit.latitude + "," + $scope.unitToEdit.longitude + "]",
				url: $scope.unitToEdit.url,
				openingDate: $scope.unitToEdit.openingDate,
				closedDate: $scope.unitToEdit.closedDate,
				contactPerson: $scope.unitToEdit.contactPerson,
				address: $scope.unitToEdit.address,
				email: $scope.unitToEdit.email,
				phoneNumber: $scope.unitToEdit.phoneNumber
			}

			orgfactory.editOrgUnit($scope.unitToEdit.id, editUnitAsJSON).success(function (result) {
				$scope.unitToEdit = {};
				$state.go('home.search');
				Materialize.toast('Success', 4000);
			});
		}

		$scope.editGeoLocationFindMe = function () {
			$window.navigator.geolocation.getCurrentPosition(function (position) {
				$scope.unitToEdit.latitude = position.coords.latitude;
				$scope.unitToEdit.longitude = position.coords.longitude;
				$scope.moveEditMarker();
			});
		}

		$scope.moveEditMarker = function () {
			editMakrerCoords = {
				lat: $scope.unitToEdit.latitude,
				lng: $scope.unitToEdit.longitude,
				name: $scope.unitToEdit.name
			}
		}
	}]);