(function () {

    var module = angular.module("nfieldAngular");

    module.factory("interviewerService", ["$http", "$rootScope", function ($http, $rootScope) {


        var getAll = function () {

            // use rootstate for authentication
            if (!$rootScope.isAuthenticated)
                return null;

            return $http.get("api/Interviewers",
            {
                params: { apiUrl: $rootScope.currentUser.apiUrl },
                description: "Getting Interviewers from API..."

            })
                .then(function (response) {
                    return response.data;
                });
        };


        return {
            getAll: getAll
        };
    }]);

}());