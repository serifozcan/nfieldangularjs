(function () {

    var module = angular.module("nfieldAngular");

    module.controller("surveyListController", ["$scope", "surveyService", "errors", function ($scope, surveyService, errors) {

        $scope.surveys = [];

        // The model for this page
        var setSurveys = function (data) {
            $scope.surveys = data;
        };

        // Attempt to get surveys from public api
        $scope.loadSurveys = function () {

            // get surveys from service
            surveyService.getAll()
                .then(setSurveys).catch(errors.catchAll("Could not get surveys"));
        };

        $scope.loadSurveys();
    }]);

}());