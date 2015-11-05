angular.module('orgunitmanager', ['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl'
            });
    })
    .controller('homeCtrl', function($scope) {
        
    });