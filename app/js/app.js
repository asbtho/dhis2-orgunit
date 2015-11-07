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
            $http.get('').then(function (result) {
                $scope.data = [
                    { name: "tst1", content: "lorem stufstum" },
                    { name: "tst2", content: "lorem stufs2tudsadsadam" },
                    { name: "tst3", content: "lorem stuf312432442stum" }
                ];
                console.log(result);
                $scope.$broadcast('dataloaded');
            }, function (error) {
                console.log('error: ' + error);
            });
        }

    });