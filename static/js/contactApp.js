angular.module('avaApp', ['ngMessages','cgBusy'])
    .config(function($interpolateProvider, $httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    })
    .controller('appointmentFormController', function($scope, $http) {
        $scope.captcha0_error = false;
        $scope.is_sent = false;
        $scope.send = function() {
    
         $scope.contact.captcha_0 = document.getElementById('appointment_0').value;
         $scope.contact.captcha_1 = document.getElementById('appointment_1').value;
         
            var req = {
                method: 'POST',
                url: '/member-booking-form/',
                data: $.param($scope.contact),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            };

            $scope.appointmentPromise = $http(req).then(function(response) {
               var data = response.data;

               if (data.status == 1) {
                  $scope.is_sent = true;
               } else {
                  document.getElementsByClassName('captcha')[0].src = data.new_cptch_image;
                  var contact0Key = document.getElementById('appointment_0');
                  contact0Key.value = data.new_cptch_key;

                  var contact1Key = document.getElementById('appointment_1');
                  contact1Key.value = '';

                  $scope.captcha0_error = true;
               }

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
        $scope.captcha_error = false;
        $scope.is_sent = false;
        $scope.send = function() {
            
         $scope.contactus.captcha_0 = document.getElementById('contact_0').value;
         $scope.contactus.captcha_1 = document.getElementById('contact_1').value;

            var req = {
                method: 'POST',
                url: '/sendmessage/',
                data: $.param($scope.contactus),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            };


            $scope.contactPromise = $http(req).then(function(response) {

               var data = response.data;
               if (data.status == 1) {
                  $scope.is_sent = true;
               } else {
                  document.getElementsByClassName('captcha')[1].src = data.new_cptch_image;
                  var contact0Key = document.getElementById('contact_0');
                  contact0Key.value = data.new_cptch_key;

                  var contact1Key = document.getElementById('contact_1');
                  contact1Key.value = '';

                  $scope.captcha_error = true;
               }

            }, function(response) {
                // called asynchronously if an error occurs or server returns response with an error status.
                //console.log(response.data);
                //$scope.server_error_msg = response.data.error.msg;
            });
        };
    });
