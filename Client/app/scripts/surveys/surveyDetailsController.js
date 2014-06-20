(function () {

    var module = angular.module("nfieldAngular");

    module.controller("surveyDetailsController", ["$scope", "$state", "events","surveyService","errors", function (
        $scope, $state, events,
        surveyService, errors) {

        $scope.survey = {SurveyName : "Test"};


    }]);
}());