angular.module('orgunitmanager.orgList', [])
    .directive('orgList', function () {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            replace: true,
            templateUrl: "templates/directives/orglist.html",
            link: function () {
                angular.element('ul.tabs').tabs();
                angular.element('.collapsible').collapsible();
            }
        };
    });