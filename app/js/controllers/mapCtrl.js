angular.module('orgunitmanager')
	.controller('mapCtrl', ['$scope', function ($scope) {
		angular.extend($scope, {
			center: {
				lat: 40.095,
				lng: -3.823,
				zoom: 5
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
		}, function (newValue, oldValue) {
			if (newValue.coordinates) {
				var coordsArray = JSON.parse(newValue.coordinates);
				console.log("coordsarray:");
				console.log(coordsArray);
				if (coordsArray.length == 2) {
					var markerForOrgUnit = {
						markerDetails: {
							lat: coordsArray[0],
							lng: coordsArray[1],
							message: 'details',
							focus: true,
							draggable: false
						}
					}
					$scope.markers.currentMark = markerForOrgUnit.markerDetails;
				} else {
					//else if?
					var currentMark = {};
					for (var i = 0; i < coordsArray[0][0].length; i++) {
						var marker = {
							lat: coordsArray[0][0][i][0],
							lng: coordsArray[0][0][i][1],
							message: 'details',
							focus: true,
							draggable: false
						}
						currentMark["m" + i] = marker;
					}
					console.log("currentmark: ");
					console.log(currentMark);
					$scope.markers.currentMark = currentMark;
					console.log($scope.markers.currentMark);
				}
			} else {
				$scope.markers.currentMark = {};
			}
		});
	}]);