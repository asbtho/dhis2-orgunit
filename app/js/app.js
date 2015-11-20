angular.module('orgunitmanager', ['ui.router'])
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
                    'search-tab': {
                        templateUrl: 'templates/editUnitTab.html',
                        controller: 'editUnitCtrl'
                    }
                }
            });
    });