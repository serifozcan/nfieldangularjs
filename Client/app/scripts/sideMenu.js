angular.module("nfieldAngular").directive("naSideMenu", function () {
    return {
        restrict: "EA",
        templateUrl: "app/views/sideMenu.html",
        controller: function ($scope, $state) {
            $scope.isActive = function (route) {
                return $state.includes(route);
            };
        }
    };
});