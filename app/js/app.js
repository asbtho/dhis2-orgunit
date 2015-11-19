angular.module('orgunitmanager', ['ui.router', 'uiGmapgoogle-maps'])
    .config(function ($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.html',
                controller: 'orgunitCtrl'
            });
            
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyBXLIUnaJ1mkQ_-MwUhyQTHbusQdSm7lCw',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    });