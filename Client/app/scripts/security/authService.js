(function () {

    var module = angular.module("nfieldAngular");

    module.factory("authService", ["$http", "$q", "$modal", "$location", "authEvents","$rootScope",
    function ($http, $q, $modal, $location, authEvents,$rootScope) {

        var currentUser = null;
        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }

        // Login form dialog stuff
        var loginDialog = null;

        var openLoginDialog = function () {
            if (loginDialog) {
                throw new Error("Trying to open a dialog that is already open!");
            }
            loginDialog = $modal.open({ templateUrl: "app/views/login/form.tpl.html", controller: "loginFormController" });
        };

        var closeLoginDialog = function (success) {
            if (loginDialog) {
                loginDialog.close(success);
            }
        };

        var cancelLogin = function () {
            closeLoginDialog(false);

        };
        var closeLogin = function () {
            closeLoginDialog(true);
            //redirect();
        };

        var login = function (apiUrl, domain, username, password) {
            currentUser = null;
            var request = $http.post('api/SignIn',
                { ApiUrl: apiUrl, Domain: domain, Username: username, Password: password },
                { description: "Signin in..." });
            return request.then(function (response) {
                currentUser = { apiUrl: apiUrl, domain: domain, userName: username, token: response.data.AuthenticationToken };
                $rootScope.$broadcast(authEvents.loginSuccess);
                return isAuthenticated();

            });
        };
        var isAuthenticated = function () {
            return !!currentUser;
        };

        var getCurrentUser = function() {
            return currentUser;
        };

        return {
            showLogin: openLoginDialog,
            cancelLogin: cancelLogin,
            closeLogin: closeLogin,
            login: login,
            isAuthenticated: isAuthenticated,
            currentUser: getCurrentUser
        };
    }]);

}());