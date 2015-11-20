angular.module('orgunitmanager', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.html',
                controller: 'orgunitCtrl'
            })
            .state('home.search', {
                url: 'search',
                views: {
                    'search-tab': {
                        templateUrl: 'templates/searchTab.html',
                        controller: 'orgunitCtrl'
                    }
                }
            })
            .state('home.add', {
                url: 'add',
                views: {
                    'add-tab': {
                        templateUrl: 'templates/addUnitTab.html',
                        controller: 'orgunitCtrl'
                    }
                }
            })
            .state('home.edit', {
                url: 'edit',
                views: {
                    'search-tab': {
                        templateUrl: 'templates/editUnitTab.html',
                        controller: 'orgunitCtrl'
                    }
                }
            });
    });