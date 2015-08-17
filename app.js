var app = angular.module('myApp', [

    'ui.bootstrap',
    'smart-table'

    ]);
app.controller('safeCtrl', ['$scope', function ($scope) {

    var id = 1;

    function generateRandomItem(id) {

        var firstname = Math.floor(Math.random() * 3);
        var lastname = Math.floor(Math.random() * 3);



        return {
            id: id,
            firstName: firstname,
            lastName: lastname
        }
    }

    $scope.rowCollection = [];

    for (id; id < 5; id++) {
        $scope.rowCollection.push(generateRandomItem(id));
    }

    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
    $scope.displayedCollection = [].concat($scope.rowCollection);

    //add to the real data holder
    $scope.addRandomItem = function addRandomItem() {
        $scope.rowCollection.push(generateRandomItem(id));
        id++;
    };

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    }
}]);