var apiBaseUrl = "";
var pageData = {};

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
            $http.get('manifest.webapp').then(function (result) {
                apiBaseUrl = result.data.activities.dhis.href + "/api";
                
                $http.get(apiBaseUrl + '/organisationUnits.json').then(function (result) {
                    $scope.data = result.data.organisationUnits;
                    pageData.page1 = result.data.organisationUnits;
                    console.log(pageData);
                    
                    pageData.page2 = result.data.organisationUnits;
                    console.log(pageData);
                    $scope.numberOfPages = new Array(result.data.pager.pageCount);
                    $scope.activePage = 1;
                    $scope.$broadcast('orgunitsloaded');
                }, function (error) {
                    console.log(error);
                });
            }, function (error) {
                console.log(error);
            });
        }
        
        $scope.goToPage = function(page) {
            $scope.activePage = page;
            console.log('go to page: ' + page);
        }

    });