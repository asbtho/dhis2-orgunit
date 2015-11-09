var apiBaseUrl = "";

angular.module('orgunitmanager', ['ui.router', 'orgunitmanager.orgList'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.html',
                controller: 'orgunitCtrl'
            });
    })
    .controller('orgunitCtrl', ['$scope', 'orgfactory', function ($scope, orgfactory) {

        $scope.status;
        $scope.orgunits;
        $scope.orgdetails;

        getOrgunits();

        function getOrgunits() {
            orgfactory.getOrgunits()
                .success(function (result) {
                    $scope.orgunits = result.data.organisationUnits;
                })
                .error(function (error) {
                    $scope.status = 'Unable to get organization units: ' + error.message;
                });
        }

        function getOrgDetails() {
            orgfactory.getOrgDetails()
                .success(function (result) {
                    $scope.orgdetails = result.data.organisationUnit;
                })
                .error(function (error) {
                    $scope.status = 'Unable to get organization unit details: ' + error.message;
                });
        }

    }]);
    
    
    
    
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
    