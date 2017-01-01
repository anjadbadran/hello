/**
 * Created by anjad on 29/12/2016.
 */
var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


    var refresh = function() {
        $http.get('/contactlist').then(function (response) {
            console.log("I got the data I requested");
            $scope.contactlist = response.data;
            $scope.contact = null
        });
    };

    refresh();
    $scope.addContact = function() {
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact).success(function(response) {
            console.log(response);
            refresh();
        });
    };


    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/contactlist/' + id).success(function(response) {
            refresh();
        });
    };


    $scope.edit = function(id) {
        console.log(id);
        $http.get('/contactlist/' + id).success(function(response) {
            $scope.contact = response;
        });
    };

    $scope.update = function() {
        console.log($scope.contact._id);
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
            refresh();
        })
    };

    $scope.deselect = function() {
        $scope.contact = "";
    }


    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }


}]);
