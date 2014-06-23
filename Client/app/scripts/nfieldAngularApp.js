(function () {
    var app = angular.module("nfieldAngular", ["ngAnimate", "ui.router", "ui.bootstrap"]);

    var configRoutes = function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("root", { url: "/", data: { authenticate: true } })
            .state("surveys", { url: "/surveys", templateUrl: "app/views/surveys/surveys.html", data: { authenticate: true } })
                .state("surveys.list", { url: "/list", templateUrl: "app/views/surveys/surveys.list.html", data: { authenticate: true } })
                .state("surveys.view", { url: "/view/:surveyId", templateUrl: "app/views/surveys/surveys.view.html", data: { authenticate: true } })
                    .state("surveys.view.details", { url: "/details", templateUrl: "app/views/surveys/surveys.view.details.html", data: { authenticate: true } })
                    .state("surveys.view.settings", { url: "/settings", templateUrl: "app/views/surveys/surveys.view.settings.html", data: { authenticate: true } })
                    .state("surveys.view.fieldwork", { url: "/fieldwork", templateUrl: "app/views/surveys/surveys.view.fieldwork.html", data: { authenticate: true } })
            .state("interviewers", { url: "/interviewers", templateUrl: "app/views/interviewers/interviewers.html", data: { authenticate: true } })
                .state("interviewers.list", { url: "/list", templateUrl: "app/views/interviewers/interviewers.list.html", data: { authenticate: true } });
    };
    app.config(configRoutes);

    var events = {
        alertError: "alert.error",
        alertSuccess: "alert.success",
        dataSourceCreated: "datasource.created"
    };
    app.value("events", events);
    var authEvents = {
        loginSuccess: "auth-login-success",
        loginFailed: "auth-login-failed",
        logoutSuccess: "auth-logout-success",
        sessionTimeout: "auth-session-timeout",
        notAuthenticated: "auth-not-authenticated",
        notAuthorized: "auth-not-authorized"
    };
    app.constant("authEvents", authEvents);

    app.run(["$rootScope", "$modal", "$timeout", "authService",
        function ($rootScope, $modal, $timeout, authService) {

        $rootScope.alerts = [];
        $rootScope.outstandingRequests = 0;
        $rootScope.requestDescription = "";
        $rootScope.currentUser = null;
        $rootScope.isAuthenticated = 0;

        $rootScope.addRequest = function (description) {
            $rootScope.outstandingRequests += 1;
            if (description) {
                $rootScope.requestDescription = description;
            }
        };
        $rootScope.removeRequest = function () {
            $rootScope.outstandingRequests -= 1;
            if ($rootScope.outstandingRequests < 1) {
                $rootScope.requestDescription = "";
            }
        };



        $rootScope.$on(authEvents.notAuthenticated, function (e, evtArgs) {
            authService.showLogin();
        });

        $rootScope.$on(authEvents.loginSuccess, function (e, evtArgs) {
            $rootScope.currentUser = authService.currentUser();
            $rootScope.isAuthenticated = authService.isAuthenticated();
        });


        $rootScope.$on('$stateChangeStart', function (event, next) {
            var authenticate = next.data.authenticate;
            if (!authService.isAuthenticated() && authenticate) {
                event.preventDefault();
                // user is not logged in
                $rootScope.$broadcast(authEvents.notAuthenticated);
            }
            
        });

        var addAlert = function (alert) {
            $rootScope.alerts.unshift(alert);
            $timeout(function () {
                var index = $rootScope.alerts.indexOf(alert);
                if (index >= 0) {
                    $rootScope.alerts.splice(index, 1);
                }
            }, 10000);
        };

        $rootScope.$on(events.alertError, function (event, message, detail) {

            if (detail && detail.data) {
                if (detail.data.messageDetail) {
                    detail = detail.data.messageDetail;
                }
                else if (detail.data.exceptionMessage) {
                    detail = detail.data.exceptionMessage;
                }
                else if (detail.data.message) {
                    detail = detail.data.message;
                }
            }
            addAlert({ type: "danger", message: message, detail: detail });
        });

        $rootScope.$on(events.alertSuccess, function (event, message, detail) {
            addAlert({ type: "success", message: message, detail: detail });
        });

        $rootScope.closeAlert = function (index) {
            $rootScope.alerts.splice(index, 1);
        };

        $rootScope.closeAllAlerts = function () {
            $rootScope.alerts.splice(0, $rootScope.alerts.length);
        };

    }]);
}());