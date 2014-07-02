(function () {

    var module = angular.module("nfieldAngular");

    module.controller("loginFormController", ["$scope", "authService", "$location", "errors", "$state", "$stateParams", function ($scope, authService, $location, errors, $state, $stateParams) {

        // The model for this form 
        $scope.user = {};

        // Any error message from failing to login
        $scope.authError = null;

        var onError = function (reason) {
            $scope.authError = reason;
        };
        var cLeanError = function() {
            $scope.authError = null;
        };
        // Attempt to authenticate the user specified in the form's model
        $scope.login = function() {
            // Clear any previous security errors
            $scope.authError = null;

            // try to login
            authService.login($scope.user.apiUrl, $scope.user.domain, $scope.user.username, $scope.user.password)
                .then(function (loggedIn) {
                if (!loggedIn) {
                    $scope.authError = "An Error occured during sign in.";
                } else {
                    authService.closeLogin();
                    var path = $location.path();
                    //$state.go($state.current, $stateParams, { reload: true, inherit: false, notify: true });
                }
                }, function() { $scope.authError = "An Error occured during sign in."; }).catch();
        };

        $scope.clearForm = function () {
            $scope.user = {};
        };

        $scope.cancelLogin = function () {
            authService.cancelLogin();
        };
    }]);

}());