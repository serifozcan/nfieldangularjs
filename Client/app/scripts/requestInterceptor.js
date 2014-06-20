(function () {

    var module = angular.module("nfieldAngular");

    module.config(function ($provide, $httpProvider) {

        $provide.factory("requestInterceptor", ["$q", "$rootScope", "authEvents", function ($q, $rootScope, authEvents) {

            var request = function (config) {
                config.headers = config.headers || {};
                if (!_.isEmpty($rootScope.currentUser) && !_.isEmpty($rootScope.currentUser.token)) {
                    config.headers.Authorization = 'Basic ' + $rootScope.currentUser.token;
                }
                return config || $q.when(config);
            };

            var requestError = function(rejection) {
                return $q.reject(rejection);
            };
            var response = function (data) {
                return data || $q.when(data);
            };

            var responseError = function (error) {
                if (error.status === 401)
                    $rootScope.$broadcast(authEvents.notAuthenticated);
                return $q.reject(error);
            };

            return {
                request: request,
                requestError : requestError,
                response: response,
                responseError: responseError
            };
        }]);

        $httpProvider.interceptors.push("requestInterceptor");

    });

}());