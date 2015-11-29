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
					draggable: true
				}
			}
			$scope.markers.currentMark = newMarker.markerDetails;
			console.log($scope.markers);
		});

		$scope.$watch(function () {
			return orgDetails;
		}, function (oldValue, newValue) {
			console.log(newValue);
			var coordsString = newValue.coordinates.slice(1, newValue.coordinates.length - 1);
			console.log(coordsString);
			var coords = coordsString.split(",");
			console.log(coords);
			var markerForOrgUnit = {
				markerDetails: {
					lat: parseInt(coords[0]),
					lng: parseInt(coords[1]),
					message: 'details',
					focus: true,
					draggable: false
				}
			}
			$scope.markers.currentMark = markerForOrgUnit.markerDetails;
		});
	}]);