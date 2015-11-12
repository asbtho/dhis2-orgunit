angular.module('orgunitmanager')
    .directive('orgList', function ($timeout) {
        return { 
            replace: true,
            templateUrl: "templates/directives/orglist.html",
            // Replaced parameter name with e
            // Because i read that calling it scope might overwrite it??
            link: function ($scope) {
                $scope.$on('orgunitsloaded', function () {
                    $timeout(function () {
                        angular.element('.collapsible').collapsible();
                    }, 0, false);
                    console.log('Orgunitsloaded and list made collapsible');
                });
                /*
                $scope.$on('orgunitsdetailsloaded', function () {
                    $timeout(function () {
                        
                    })
                });
                */
            }
        };
    });