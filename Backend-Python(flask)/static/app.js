var grettings ='hello world';

function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed!";
}

angular.module('demo', [])
.controller('Hello', function($scope, $http) {
    $http.get('http://localhost:5000/resourse').
        then(function(response) {
            $scope.report  = response.data;
        });
});
