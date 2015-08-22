(function () {
  'use strict';

  angular.module('myApp.directives')
    .directive('d3Bars', ['d3','$window', function(d3, $window) {
      return {
        restrict: 'EA',
        scope: {
          data: "=",
          label: "@",
          onClick: "&"
        },
        link: function(scope, iElement, iAttrs) {
          var svg = d3.select("#scatterPlot")
              .append("svg")
              .attr("width", angular.element($window)[0].innerWidth/2)

          console.log("svg", angular.element($window)[0].innerWidth/2)

          // on window resize, re-render d3 canvas
          window.onresize = function() {
            return scope.$apply();
          };
          scope.$watch(function(){
              return angular.element(window)[0].innerWidth;
            }, function(){
              return scope.render(scope.data);
            }
          );

          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          // define render function
          scope.render = function(data){
            // remove all previous items before render
            svg.selectAll("*").remove();

            // setup variables
            var width = angular.element($window)[0].innerWidth/2,
                height=angular.element($window)[0].innerHeight/2, 
                padding = 20;
   
            // 20 is for margins and can be changed
        
            // set the height based on the calculations above
            svg.attr('height', height);

            var xScale = d3.scale.linear().range([padding, width - padding * 2]);
            var yScale = d3.scale.linear().range([height - padding, padding]);
            var max_x = d3.max(data, function(d){ return d.x;});
            var max_y = d3.max(data, function(d){ return d.y;});
            var min_x = d3.min(data, function(d){ return d.x;});
            var min_y = d3.min(data, function(d){ return d.y;});

             xScale.domain([0, max_x ]);
             yScale.domain([0, max_y ]);
            // Define the axes
            var xAxis = d3.svg.axis().scale(xScale)
                .orient("bottom").ticks(10);

            var yAxis = d3.svg.axis().scale(yScale)
                .orient("left").ticks(10);


              svg.selectAll("circle")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", function(d,i){ return xScale(d.x); })
                  .attr("cy", function(d,i){ return yScale(d.y); })
                  .attr("r", function(d,i){ return 4;})
                  .attr("fill", function(d,i){ return "orange";})
                  .transition()
                  .duration(2000)
                  .attr("cx", function(d,i){ return xScale( (d.x - min_x)/(max_x - min_x) ); })
                  .attr("cy", function(d,i){ return yScale( (d.y - min_y)/(max_y - min_y) ); })
                  .attr("fill", function(d,i){ return "red";})
              // Add the X Axis
              svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + (height - padding) + ")")
                  .call(xAxis);

              // Add the Y Axis
              svg.append("g")
                  .attr("class", "y axis")
                  .attr("transform", "translate("+ padding+",0)")
                  .call(yAxis);


          };
        }
      };
    }]);

}());