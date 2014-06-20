(function () {

    var app = angular.module("nfieldAngular");

    app.factory('loaderInterceptor', ['$q', '$rootScope', 
    function ($q, $rootScope) {
        return {
            request: function (config) {
                $rootScope.addRequest(config.description);
                config.headers = config.headers || {};
                if (!_.isEmpty($rootScope.currentUser) && !_.isEmpty($rootScope.currentUser.token)) {
                    config.headers.Authorization = 'Basic ' + $rootScope.currentUser.token;
                }
                return $q.when(config);
            },
            requestError: function (request) {
                return $q.reject(request);
            },
            response: function (response) {
                $rootScope.removeRequest();
                return $q.when(response);
            },
            responseError: function (response) {
                $rootScope.removeRequest();
                return $q.reject(response);
            }
        };
    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('loaderInterceptor');
    }]);
    //app.config(function ($provide, $httpProvider) {

    //    $provide.factory("loaderInterceptor", function ($q, $rootScope) {

    //        var request = function (config) {
    //            $rootScope.addRequest(config.description);
    //            return $q.when(config);
    //        };

    //        var response = function (data) {
    //            $rootScope.removeRequest();
    //            return $q.when(data);
    //        };

    //        var responseError = function (error) {
    //            $rootScope.removeRequest();
    //            return $q.reject(error);
    //        };

    //        return {
    //            request: request,
    //            response: response,
    //            responseError: responseError
    //        };
    //    });

    //    $httpProvider.interceptors.push("loaderInterceptor");

    //});

}());