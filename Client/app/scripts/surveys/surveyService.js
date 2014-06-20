(function () {

    var module = angular.module("nfieldAngular");

    module.factory("surveyService", ["$http", "$rootScope", function ($http, $rootScope) {


        var getAll = function () {

            if (!$rootScope.isAuthenticated)
                return null;

            return $http.get("api/Surveys",
            {
                params: { apiUrl: $rootScope.currentUser.apiUrl },
                description: "Getting Surveys from API..."

            })
                .then(function (response) {
                    return response.data;
                });
        };

        var getById = function (id) {
            return $http.get("api/Surveys/GetById",
                {
                    params: { apiUrl: $rootScope.currentUser.apiUrl, id: id },
                    description: "Getting Survey by id from API..."
                })
                .then(function (response) {
                    return response.data;
                });
        };

        return {
            getAll: getAll,
            getById: getById
        };
    }]);

}());