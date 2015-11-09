angular.module('orgunitmanager', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.html',
                controller: 'orgunitCtrl'
            });
    });
    
    
    /*
    .controller('homeCtrl', function ($scope, $http) {
        $scope.getContent = function () {
            $http.get('manifest.webapp').then(function (result) {
                apiBaseUrl = result.data.activities.dhis.href + "/api";
                
                $http.get(apiBaseUrl + '/organisationUnits.json').then(function (result) {
                    $scope.data = result.data.organisationUnits;
                    $scope.$broadcast('orgunitsloaded');
                }, function (error) {
                    console.log(error);
                });
            }, function (error) {
                console.log(error);
            });


        }
    });
    */
    