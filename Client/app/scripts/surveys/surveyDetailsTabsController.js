(function () {

    var module = angular.module("nfieldAngular");

    module.controller("surveyDetailsTabsController", ["$scope","$state", function ($scope, $state) {
        $scope.tabs = [
          { header: "Details", route: "surveys.view.details" },
          { header: "Settings", route: "surveys.view.settings" },
          { header: "Fieldwork Status", route: "surveys.view.fieldwork" },
          { header: "Interviewers", route: "surveys.view.interviewers" }
        ];

        $scope.goTo = function (route) {
            $state.go(route);
        };

        $scope.active = function (route) {
            return $state.is(route);
        };

        $scope.$on("$stateChangeSuccess", function () {
            angular.forEach($scope.tabs, function (tab) {
                tab.active = $scope.active(tab.route);
            });

        });
    }]);

}());