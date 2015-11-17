angular.module('orgunitmanager')
    .directive('orgList', function ($timeout) {
        return {
            replace: true,
            templateUrl: "templates/directives/orglist.html",
            link: function ($scope) {
                $scope.$on('orgunitsloaded', function () {
                    $timeout(function () {
                        angular.element('.collapsible').collapsible();
                    }, 0, false);
                    console.log('Orgunitsloaded and list made collapsible');
                });
            }
        };
    });