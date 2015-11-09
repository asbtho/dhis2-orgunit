angular.module('orgunitmanager', ['ui.router', 'orgunitmanager.orgList'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl'
            });
    })
    .controller('homeCtrl', function ($scope, $http) {
        $scope.getContent = function () {
            //link fix
            $http.get('https://apps.dhis2.org/demo/api/organisationUnits.json').then(function (result) {
                $scope.data = result.data.organisationUnits;
                console.log(result);
                $scope.$broadcast('orgunitsloaded');
            }, function (error) {
                console.log(error);
            });
        }
    });