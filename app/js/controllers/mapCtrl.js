var newUnitCoords = {};
var editMakrerCoords = {};
var timeToClearMap = false;

angular.module('orgunitmanager')
	.controller('mapCtrl', ['$scope', '$timeout', '$location', '$anchorScroll', function ($scope, $timeout, $location, $anchorScroll) {
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
					draggable: true
				}
			}
			$scope.markers.currentMark = newMarker.markerDetails;
			$scope.$broadcast('addNewClick', {
				lat: clickEvent.latlng.lat,
				lng: clickEvent.latlng.lng
			});
		});

		$scope.$on('leafletDirectiveMarker.dragend', function (event, args) {
			var dragevent = args.leafletEvent;
			$scope.$broadcast('addNewClick', {
				lat: dragevent.target._latlng.lat,
				lng: dragevent.target._latlng.lat
			});
		});

		$scope.$on('leafletDirectiveMarker.click', function (event, args) {
			var orgId = args.model.orgId;
			gotoOrg(orgId);
			$timeout(function () {
				if (!angular.element('#' + orgId).hasClass("active")) {
					angular.element('#' + orgId).trigger('click');
				}
			});
		});

		function gotoOrg(orgId) {
			// set the location.hash to the id of
			// the element you wish to scroll to.
			$location.hash(orgId);
			$anchorScroll();
		};

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
					orgId: newValue.id
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
				centerOnCurrentMarker();
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
					orgId: markerJSON.orgId
				}
			};
			return markerForOrgUnit.markerDetails;
		}

		function centerOnCurrentMarker() {
			var latitude = $scope.markers.currentMark.lat;
			var longitude = $scope.markers.currentMark.lng;
			angular.extend($scope, {
				center: {
					lat: latitude,
					lng: longitude,
					zoom: 8
				}
			});
		}

		function centerMapOn(latitude, longitude, zoom) {
			if (zoom !== null) {
				angular.extend($scope, {
					center: {
						lat: latitude,
						lng: longitude,
						zoom: zoom
					}
				});
			} else {
				angular.extend($scope, {
					center: {
						lat: latitude,
						lng: longitude
					}
				});
			}
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
			currentMark[markerJSON.orgId] = {
				lat: markerJSON.coordsArray[0][0][0][0],
				lng: markerJSON.coordsArray[0][0][0][1],
				message: markerJSON.name,
				focus: true,
				draggable: false,
				orgId: markerJSON.orgId
			};
			for (var i = 0; i < markerJSON.coordsArray[0][0].length; i++) {
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

		$scope.$watch(function () {
			return editMakrerCoords;
		}, function (newVal, oldVal) {
			if (newVal.lat && newVal.lng) {
				clearMap();
				var markerJSON = {
					lat: parseFloat(newVal.lat),
					lng: parseFloat(newVal.lng),
					message: newVal.name,
					focus: true,
					draggable: false,
				}
				$scope.markers.currentMark = markerJSON;
				centerOnCurrentMarker();
			}
		});		
		
		$scope.$watch(function () {
			return searchOrgMarkers;
		}, function (newVal, oldVal) {
			clearMap();
			var searchMarkers = {};
			var marker = {};
			for (var key in newVal) {
				if (newVal[key].hasOwnProperty('coordinates')) {
					var latLng = JSON.parse(newVal[key].coordinates);
					var markerJSON = {
						name: newVal[key].name,
						coordsArray: latLng,
						orgId: newVal[key].id
					};
					if (markerJSON.coordsArray.length == 2) {
						marker = singleMarker(markerJSON);
						searchMarkers[newVal[key].id] = marker;
					} else {
						//not poly because performance
						marker = polygonMarker(markerJSON);
						searchMarkers[newVal[key].id] = marker.marks[markerJSON.orgId];
					}
				}
			}
			console.log("searchmarkers: ");
			console.log(searchMarkers);
			$scope.markers = searchMarkers;
		});

		$scope.$watch(function () {
			return timeToClearMap;
		}, function (newVal, oldVal) {
			if (newVal) {
				clearMap();
				timeToClearMap = false;
			}
		});
	}]);