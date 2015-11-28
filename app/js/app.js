<<<<<<< HEAD
angular.module('orgunitmanager', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("search");
=======
angular.module('orgunitmanager', ['ui.router', 'uiGmapgoogle-maps'])
    .config(function ($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
        $urlRouterProvider.otherwise("/");
>>>>>>> origin/Asbjorn-branch
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
            
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyBXLIUnaJ1mkQ_-MwUhyQTHbusQdSm7lCw',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    });