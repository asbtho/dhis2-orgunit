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
			},
			paths: {}
		});
		$scope.$on('leafletDirectiveMap.click', function (event, args) {
			clearMap();
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
			clearMap();
			if (newValue.coordinates) {
				var coordsArray = JSON.parse(newValue.coordinates);
				//arrays med andre lengder?
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
					var currentMark = {};
					var path = {
						p1: {
							color: '#008000',
							weight: 8,
							latlngs: []
						}
					};
					for (var i = 0; i < coordsArray[0][0].length; i++) {
						var marker = {
							lat: coordsArray[0][0][i][0],
							lng: coordsArray[0][0][i][1],
							message: 'details',
							focus: true,
							draggable: false
						}
						currentMark["m" + i] = marker;
						path.p1.latlngs.push({lat: coordsArray[0][0][i][0], lng: coordsArray[0][0][i][1]});
					}
					$scope.markers = currentMark;
					$scope.paths = path;
				}
			}
		});
		function clearMap() {
			$scope.markers = {};
			$scope.paths = {};
		}
	}]);