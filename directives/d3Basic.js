(function () {
  'use strict';

  angular.module('myApp.directives')
    .directive('d3Bars', ['d3', function(d3) {
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
              .attr("width", 500)

          console.log("svg",svg)

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
            var width = 500, height=500, padding = 20;
   
            // 20 is for margins and can be changed
        
            // set the height based on the calculations above
            svg.attr('height', height);

            var xScale = d3.scale.linear().range([padding, width - padding * 2]);
            var yScale = d3.scale.linear().range([height - padding, padding]);

             xScale.domain([0, 15]);
             yScale.domain([0, 15]);
            // Define the axes
            var xAxis = d3.svg.axis().scale(xScale)
                .orient("bottom").ticks(10);

            var yAxis = d3.svg.axis().scale(yScale)
                .orient("left").ticks(10);


              svg.selectAll("circle")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", function(d,i){ return xScale(d.x);})
                  .attr("cy", function(d,i){ return yScale(d.y);})
                  .attr("r", function(d,i){ return 4;})
                  .attr("fill", function(d,i){ return "orange";})

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