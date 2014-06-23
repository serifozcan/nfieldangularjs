(function () {

    var module = angular.module("nfieldAngular");

    module.controller("surveyDetailsController", ["$scope", "$state","surveyService","errors", function (
        $scope, $state,
        surveyService, errors) {

        $scope.survey = {};
        $scope.survey.settings = {};
        $scope.fieldwork = {};

        var getSurvey = function () {
            surveyService.getById($state.params.surveyId)
                    .then(function (data) {
                        $scope.survey = data;
                    }).catch(errors.catchAll("Could not retrieve survey"));
        };

        var getSurveySettings = function() {
            surveyService.getSettings($state.params.surveyId)
                .then(function(data) {
                    $scope.survey.settings = data;
            }).catch(errors.catchAll("Could not retrieve survey's settings"));

        };
        var getSurveyFieldworkStatus = function () {
            surveyService.getFieldworkStatus($state.params.surveyId)
                .then(function (data) {
                    $scope.fieldwork = data;
                }).catch(errors.catchAll("Could not retrieve survey's fieldwork information"));

        };
        var init = function() {
            // try using pormises if its possible  
            getSurvey();
            //getSurveySettings();
            getSurveyFieldworkStatus();
        };

        init();
    }]);
}());