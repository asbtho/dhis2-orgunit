var newUnitCoords = {};

angular.module('orgunitmanager')
	.controller('mapCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
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
					message: 'Add new unit',
					focus: true,
					draggable: false
				}
			}
			$scope.markers.currentMark = newMarker.markerDetails;
			$scope.$broadcast('addNewClick', {
				lat: clickEvent.latlng.lat,
				lng: clickEvent.latlng.lng
			});
		});

		$scope.$watch(function () {
			return orgDetails;
		}, function (newValue, oldValue) {
			clearMap();
			var markers = {};
			if (newValue.coordinates) {
				var coordsArray = JSON.parse(newValue.coordinates);
				var markerJSON = {
					name: newValue.name,
					coordsArray: coordsArray,
				};
				if (coordsArray.length == 2) {
					markers = singleMarker(markerJSON);
					$scope.markers.currentMark = markers;
				} else {
					markers = polygonMarker(markerJSON);
					$scope.markers = markers.marks;
					$scope.paths = markers.paths;
				}
			}
		});

		$scope.$watch(function () {
			return findMeCoords;
		}, function (newVal, oldVal) {
			if (newVal.lat) {
				clearMap();
				var coordsArray = {};
				coordsArray[0] = newVal.lat;
				coordsArray[1] = newVal.lng;
				var markerJSON = {
					name: "Add new unit",
					coordsArray: coordsArray,
				};
				var markers = singleMarker(markerJSON);
				$scope.markers.currentMark = markers;
			}
		});

		function singleMarker(markerJSON) {
			var markerForOrgUnit = {
				markerDetails: {
					lat: markerJSON.coordsArray[0],
					lng: markerJSON.coordsArray[1],
					message: markerJSON.name,
					focus: true,
					draggable: false,
				}
			};
			return markerForOrgUnit.markerDetails;
		}

		function polygonMarker(markerJSON) {
			var currentMark = {};
			var path = {
				p1: {
					stroke: false,
					fillColor: '#2196F3',
					type: 'polygon',
					latlngs: []
				}
			};
			for (var i = 0; i < markerJSON.coordsArray[0][0].length; i++) {
				var marker = {
					lat: markerJSON.coordsArray[0][0][i][0],
					lng: markerJSON.coordsArray[0][0][i][1],
					message: markerJSON.name,
					focus: true,
					draggable: false
				};
				currentMark["m" + i] = marker;
				path.p1.latlngs.push({ lat: markerJSON.coordsArray[0][0][i][0], lng: markerJSON.coordsArray[0][0][i][1] });
			}
			return { marks: currentMark, paths: path };
		}

		function clearMap() {
			$scope.markers = {};
			$scope.paths = {};
		}

		$scope.$on('addNewClick', function (event, data) {
			$timeout(function () {
				angular.element('ul.tabs').tabs('select_tab', 'add-window');
				newUnitCoords = {
					lat: data.lat,
					lng: data.lng
				}
			});
		});

		//TODO: handle polygons
		//TODO: click marker -> open details
		//center?
		$scope.$watch(function () {
			return searchOrgMarkers;
		}, function (newVal, oldVal) {
			clearMap();
			var searchMarkers = {};
			var searchPaths = {};
			var marker = {};
			for (var key in newVal) {
				if (newVal[key].hasOwnProperty('coordinates')) {
					var latLng = JSON.parse(newVal[key].coordinates);
					var markerJSON = {
						name: newVal[key].name,
						coordsArray: latLng,
					};
					if (markerJSON.coordsArray.length == 2) {
						marker = singleMarker(markerJSON);
						searchMarkers[key] = marker;
					} else {
						marker = polygonMarker(markerJSON);
						searchMarkers[key] = marker;
						searchPaths[key] = marker.paths;
					}
				}
			}
			$scope.markers = searchMarkers;
			$scope.paths = searchPaths;
		});
	}]);