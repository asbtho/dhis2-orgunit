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
			markers: {
				osloMarker: {
					lat: 59.91,
					lng: 10.75,
					message: "I want to travel here!",
					focus: true,
					draggable: false
				}
			},
			events: {
				map: {
					enable: ['zoomstart', 'drag', 'click'],
					logic: 'emit'
				}
			}
		});
		$scope.$on('leafletDirectiveMap.click', function (event) {
			var newMarker = {
				nmark: {
					lat: 2,
					lng: 10,
					message: "new marker",
					focus: true,
					draggable: false
				}
			}
			$scope.markers[newMarker["nmark"]] = newMarker.nmark;
			console.log($scope.markers);
		});
	}]);