// public/core.js
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http, $location) {
    $scope.formData = {};
    //var upc = 611269357011;

    var absUrl = $location.absUrl();
    console.log(absUrl);
    var productCodeArray = absUrl.split("/");
    var productCode = productCodeArray[productCodeArray.length-1]

    $scope.title = productCode;

    // when landing on the page, get all todos and show them
    $http.get('/api?id=' + productCode)
        .success(function(data) {
            // $scope.todos = data;
            console.log(data);
            $scope.category = data.category;
            $scope.product_name = data.product_name;
            $scope.brand = data.brand;
            $scope.ingredients = data.ingredients; 
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}