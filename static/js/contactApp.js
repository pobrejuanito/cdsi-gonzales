angular.module('avaApp', ['ngMessages','cgBusy'])
    .config(function($interpolateProvider, $httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    })
    .controller('appointmentFormController', function($scope, $http) {

        $scope.is_sent = false;
        $scope.send = function() {
            var req = {
                method: 'POST',
                url: '/',
                data: $.param($scope.contact),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            };

            $scope.appointmentPromise = $http(req).then(function(response) {

                $scope.is_sent = true;
                // this callback will be called asynchronously, when the response is available
                $scope.server_error_msg = '';
                //$scope.hasError = false;
                //$location.path('/done');

            }, function(response) {
                // called asynchronously if an error occurs or server returns response with an error status.
                // field parameters where missing
                //console.log(response.data);
                //$scope.server_error_msg = response.data.error.msg;
            });
        };
        $scope.contact = {
            time: 'Morning',
        };
    })
    .controller('contactusFormController', function($scope, $http) {

        $scope.is_sent = false;
        $scope.send = function() {

            var req = {
                method: 'POST',
                url: '/sendmessage/',
                data: $.param($scope.contactus),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            };


            $scope.contactPromise = $http(req).then(function(response) {

                $scope.is_sent = true;
                // this callback will be called asynchronously, when the response is available
                $scope.server_error_msg = '';
                //$scope.hasError = false;
                //$location.path('/done');

            }, function(response) {
                // called asynchronously if an error occurs or server returns response with an error status.
                //console.log(response.data);
                //$scope.server_error_msg = response.data.error.msg;
            });
        };
    });
