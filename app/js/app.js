angular.module('orgunitmanager', ['ui.router']) //'d2Menu'
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl'
            });
    })
    .controller('homeCtrl', function ($scope) {
        $scope.initTabs = function () {
            console.log('lel');
            angular.element('ul.tabs').tabs();
            
        }
    });