angular.module('orgunitmanager')
	.controller('googleMapsCtrl', ['$scope', 'orgfactory', '$http', 'uiGmapGoogleMapApi', 'uiGmapIsReady',

		function ($scope, orgfactory, $http, uiGmapGoogleMapApi, uiGmapIsReady) {
		
			//Add new button on upper right side
			$scope.addNewText = 'Add new';
			$scope.addNewClicked = false;
			$scope.addNewClick = function () {
				$scope.addNewClicked = !$scope.addNewClicked;
				alert('Add New clicked!');
			};
		
			//Find me button on upper left side
			$scope.findMeText = 'Find me';
			$scope.findMeClicked = false;
			$scope.findMeClick = function () {
				$scope.findMeClicked = !$scope.findMeClicked;
				alert('Find me clicked!');
			};
		
			//Add new unit on map click
			
		
			// uiGmapGoogleMapApi is a promise.
			// The "then" callback function provides the google.maps object.
			uiGmapGoogleMapApi.then(function (maps) {
				//default init map coordinates and options
				$scope.map = { center: { latitude: -4, longitude: 20 }, zoom: 2 };
				$scope.options = {
					//scrollwheel: false,
					mapTypeControl: true,
					mapTypeControlOptions: {
						position: maps.ControlPosition.BOTTOM_RIGHT
					},
					zoomControl: true,
					zoomControlOptions: {
						position: maps.ControlPosition.RIGHT_CENTER
					},
					panControl: false
				}
			});

			uiGmapIsReady.promise()                     // this gets all (ready) map instances - defaults to 1 for the first map
				.then(function (instances) {                 // instances is an array object
					var maps = instances[0].map;            // if only 1 map it's found at index 0 of array
					$scope.myOnceOnlyFunction(maps);        // pass the map to your function
				});

			$scope.myOnceOnlyFunction = function (maps) {
			};

		}]);