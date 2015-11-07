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
                })
            }
        };
    });