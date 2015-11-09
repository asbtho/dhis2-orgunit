angular.module('orgunitmanager.orgList', [])
    .directive('orgList', function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            replace: true,
            templateUrl: "templates/directives/orglist.html",
            link: function ($scope) {
                $scope.$on('orgunitsloaded', function () {
                    $timeout(function () {
                        angular.element('ul.tabs').tabs();
                        angular.element('.collapsible').collapsible();
                    }, 0, false);
                });
                
                $scope.$on('orgunitsdetailsloaded', function () {
                    console.log('test broadcast');
                });
            },
            controller: function ($scope, $http) {
                $scope.getDetails = function (unitLink) {
                    $http.get(unitLink).then(function (result) {
                        $scope.unitDetails = result;
                        $scope.$broadcast('orgunitsdetailsloaded');
                    }, function (error) {
                        console.log(error);
                    });
                }
            }
        };
    });