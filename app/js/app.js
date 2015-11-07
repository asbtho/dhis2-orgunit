angular.module('orgunitmanager', ['ui.router', 'orgunitmanager.orgList']) //'d2Menu'
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
            //angular.element('ul.tabs').tabs();
            //angular.element('.collapsible').collapsible();
            /*$http.get('api/organisationUnits.json').then(function (result) {
                console.log(result);
            }, function (error) {
                console.log('error: ' + error);
            });*/
        }
        
    });