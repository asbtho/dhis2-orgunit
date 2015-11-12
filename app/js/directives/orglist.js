angular.module('orgunitmanager')
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
                        angular.element('.collapsible').collapsible();
                    }, 0, false);
                    console.log('Orgunitsloaded and list made collapsible');
                });

                $scope.$on('orgunitsdetailsloaded', function () {
                    $timeout(function () {
                        console.log('orgunitsdetailsCalled' + $scope.orgdetails);
                    })
                });
            }
        };
    });