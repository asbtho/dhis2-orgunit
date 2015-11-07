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
                $scope.$on('dataloaded', function () {
                    $timeout(function () { // You might need this timeout to be sure its run after DOM render.
                        angular.element('ul.tabs').tabs();
                        angular.element('.collapsible').collapsible();
                    }, 0, false);
                })
            }
        };
    });