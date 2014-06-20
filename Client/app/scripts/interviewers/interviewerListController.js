(function () {

    var module = angular.module("nfieldAngular");

    module.controller("interviewerListController", ["$scope", "interviewerService", "errors",
        function ($scope, interviewerService, errors) {

        $scope.interviewers = [];

        // The model for this page
        var setInterviewers = function (data) {
            $scope.interviewers = data;
        };

        // Attempt to get surveys from public api
        $scope.loadInterviewers = function () {

            // get interviewers from service
            interviewerService.getAll()
                .then(setInterviewers).catch(errors.catchAll("Could not get interviewers"));
        };

        $scope.loadInterviewers();
    }]);

}());