angular.module('orgunitmanager')
	.controller('mapCtrl', ['$scope', function ($scope) {
		angular.extend($scope, {
			center: {
				lat: 40.095,
				lng: -3.823,
				zoom: 4
			},
			defaults: {
				scrollWheelZoom: true
			},
			markers: {},
			events: {
				map: {
					enable: ['zoomstart', 'drag', 'click'],
					logic: 'emit'
				}
			}
		});
		$scope.$on('leafletDirectiveMap.click', function (event, args) {
			var clickEvent = args.leafletEvent;
			var newMarker = {
				markerDetails: {
					lat: clickEvent.latlng.lat,
					lng: clickEvent.latlng.lng,
					message: 'Do you want to add a new unit here?',
					focus: true,
					draggable: false
				}
			}
			$scope.markers.currentMark = newMarker.markerDetails;
			console.log($scope.markers);
		});

		$scope.$watch(function () {
			return orgDetails;
		}, function (oldValue, newValue) {
			var markerForOrgUnit = {
				markerDetails: {
					lat: 3,
					lng: 2,
					message: 'details',
					focus: true,
					draggable: false
				}
			}
			$scope.markers.currentMark = markerForOrgUnit.markerDetails;
		});
	}]);