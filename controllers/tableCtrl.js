
(function () {
  'use strict';

angular.module('myApp.controllers')
	.controller('safeCtrl', ['$scope', function ($scope) {

    var id = 1, x_max=-1, x_min= 100, y_max=-1, y_min=100;
    function generateRandomItem(id) {

        var x = Math.floor(Math.random() * 15);
        var y = Math.floor(Math.random() * 70);

        if( x > x_max ){
        	x_max = x;
        }
        if( y > y_max ){
        	y_max = y;
        }
        if( x < x_min){
        	x_min = x;
        }
        if( y < y_min){
        	y_min = y;
        }
        function zscore(num, a_max, a_min){
        	return (num - a_min)/(a_max - a_min);
        }

        return {
            id: id,
            x: x,
            y: y,
            x_dash: zscore(x, x_max, x_min),
            y_dash: zscore(y, y_max, y_min)
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