angular.module('orgunitmanager', ['ui.router', 'leaflet-directive', 'sticky'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("search");
        $stateProvider
            .state('home', {
                url: '/',
                abstract: true,
                templateUrl: 'templates/home.html',
                controller: 'orgunitCtrl'
            })
            .state('home.search', {
                url: 'search',
                views: {
                    'tab-window': {
                        templateUrl: 'templates/searchTab.html',
                        controller: 'orgunitCtrl'
                    }
                }
            })
            .state('home.add', {
                url: 'add',
                views: {
                    'tab-window': {
                        templateUrl: 'templates/addUnitTab.html',
                        controller: 'addUnitCtrl'
                    }
                }
            })
            .state('home.edit', {
                url: 'edit',
                params: {
                    unitCurrentDetails: null
                },
                views: {
                    'tab-window': {
                        templateUrl: 'templates/editUnitTab.html',
                        controller: 'editUnitCtrl'
                    }
                }
            });
    });