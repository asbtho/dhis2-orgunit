angular.module('orgunitmanager')
	.controller('editUnitCtrl', ['$scope', 'orgfactory', '$stateParams', function ($scope, orgfactory, $stateParams) {
		
		$scope.initEdit = function () {
			console.log($stateParams.unitCurrentDetails);
		}
		
	}]);