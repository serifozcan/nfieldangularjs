(function () {

    var module = angular.module("nfieldAngular");

    module.factory("securityService", ["$http", "$q", "$modal", "$location", function ($http, $q, $modal, $location) {

        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }

        // Login form dialog stuff
        var loginDialog = null;

        var openLoginDialog = function() {
            if (loginDialog) {
                throw new Error("Trying to open a dialog that is already open!");
            }

            loginDialog = $modal.open("views/login/form.tpl.html", "loginFormController");
        };

        var closeLoginDialog = function(success) {
            if (loginDialog) {
                loginDialog.close(success);
            }
        };

        var cancelLogin = function() {
            closeLoginDialog(false);
            redirect();
        };

        var login = function(apiUrl, domain, username, password) {
            var request = $http.post(apiUrl + '/v1/SignIn', { Domain: domain, Username: username, Password: password }, { description: "Signin in..." });
            return request.then(function(response) {
                return true;

            });
        };

        return {
            showLogin: openLoginDialog,
            cancelLogin: cancelLogin,
            login: login
        };
    }]);

}());