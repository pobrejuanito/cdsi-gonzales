angular.module('avaApp', ['ngMessages'])
    .config(function($interpolateProvider, $httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    })
    .controller('contactFormController', function($scope, $http) {

        $scope.is_sent = false;
        $scope.send = function() {
            var req = {
                method: 'POST',
                url: '/',
                data: $.param($scope.contact),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            };

            $scope.myPromise = $http(req).then(function(response) {

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
    .controller('subscribeFormController', function($scope, $http) {

        $scope.is_sent = false;
        $scope.send = function() {


            if ( $scope.subscribe.email != '' ) {

                var req = {
                    method: 'POST',
                    url: '/subscribe',
                    data: $.param($scope.subscribe),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };

                $scope.myPromise = $http(req).then(function(response) {

                    $scope.is_sent = true;
                    // this callback will be called asynchronously, when the response is available
                    console.log('OK');
                    $scope.subscribe.email = '';
                    //$scope.hasError = false;
                    //$location.path('/done');

                }, function(response) {
                    // called asynchronously if an error occurs or server returns response with an error status.
                    // field parameters where missing
                    //console.log(response.data);
                    //$scope.server_error_msg = response.data.error.msg;
                    console.log('Error');
                });
            }
        };
    });
