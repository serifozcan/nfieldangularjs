(function () {

    var module = angular.module("nfieldAngular");

    module.factory("errors", function ($rootScope, events) {

        var catchAll = function (message) {
            return function (error) {
                $rootScope.$emit(events.alertError, message, error);
            };
        };

        return {
            catchAll: catchAll
        };
    });

    module.config(function ($provide) {
        $provide.decorator("$exceptionHandler", function (
            $delegate, $injector, events) {
            return function (exception, cause) {
                var scope = $injector.get("$rootScope");
                var message = exception && exception.message;
                scope.$emit(events.alertError, "Program Error", message);
                $delegate(exception, cause);
            };
        });
    });

}());