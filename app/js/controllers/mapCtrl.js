angular.module('orgunitmanager')
	.controller('mapCtrl', ['$scope', function ($scope) {
		angular.extend($scope, {
			center: {
				lat: 40.095,
				lng: 75,
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
			var newCenter = {};
			if (newValue.coordinates) {
				var coordsArray = JSON.parse(newValue.coordinates);
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
					newCenter = {
						lat: markerForOrgUnit.markerDetails.lat,
						lng: markerForOrgUnit.markerDetails.lng,
						zoom: 5
					};
				} else {
					var currentMark = {};
					var path = {
						p1: {
							stroke: false,
							fillColor: '#2196F3',
							type: 'polygon',
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
						path.p1.latlngs.push({ lat: coordsArray[0][0][i][0], lng: coordsArray[0][0][i][1] });
					}
					$scope.markers = currentMark;
					$scope.paths = path;
					newCenter = {
						lat: coordsArray[0][0][0][0],
						lng: coordsArray[0][0][0][1],
						zoom: 5
					}
				}
				$scope.center = newCenter;
			}
		});
		function clearMap() {
			$scope.markers = {};
			$scope.paths = {};
		}
	}]);