
(function () {
  'use strict';

angular.module('myApp.controllers')
	.controller('safeCtrl', ['$scope', function ($scope) {

    var id = 1;

    function generateRandomItem(id) {

        var x = Math.floor(Math.random() * 15);
        var y = Math.floor(Math.random() * 15);

        return {
            id: id,
            x: x,
            y: y
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
}])

}());