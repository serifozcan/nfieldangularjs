(function () {

    var module = angular.module("nfieldAngular");

    module.controller("surveyDetailsController", ["$scope", "$state","surveyService","errors", function (
        $scope, $state,
        surveyService, errors) {

        $scope.survey = {};

        var getSurvey = function () {
            surveyService.getById($state.params.surveyId)
                    .then(function (data) {
                        $scope.survey = data;
                    }).catch(errors.catchAll("Could not retrieve report"));
        };

        getSurvey();
    }]);
}());