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
            if (pageData.hasOwnProperty('page'+ page)) {
                $scope.data = pageData['page' + page];
                console.log('contains');
            } else {
                $http.get(apiBaseUrl + '/organisationUnits.json?page=' + page).then(function (result) {
                    $scope.data = result.data.organisationUnits;
                    pageData['page' + page] = result.data.organisationUnits;
                }, function (error) {
                    console.log(error);
                });
            }
            console.log('go to page: ' + page);
        }

    });