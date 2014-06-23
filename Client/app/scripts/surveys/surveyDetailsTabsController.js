(function () {

    var module = angular.module("nfieldAngular");

    module.controller("surveyDetailsTabsController", ["$scope","$state", function ($scope, $state) {
        $scope.tabs = [
          { header: "Details", route: "surveys.view.details" },
          { header: "Fieldwork", route: "surveys.view.fieldwork" }
        ];

        $scope.sapsal = function (route) {
            $state.go(route);
        };

        $scope.active = function (route) {
            return $state.is(route);
        };

        $scope.$on("$stateChangeSuccess", function () {
            console.log("$stateChangeSuccess event triggered ");
            angular.forEach($scope.tabs, function (tab) {
                tab.active = $scope.active(tab.route);
            });

        });
    }]);

}());