'use strict';

/**
 * @ngdoc directive
 * @name socialBubblesApp.directive:simpleLineChart
 * @description
 * # simpleLineChart
 */
angular.module('socialBubblesApp')
  .directive('simpleLineChart', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {
        data: '=' //bi-directional data-binding
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
          if (!attrs) {
            console.log('oldVals is unused');
          }

          /**** STATIC VARIABLES, THESE DO NOT GET AFFECTED BY DATA CHANGE ****/
          var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 600 - margin.left - margin.right,
            height = 700 - margin.top - margin.bottom;

          var svg = d3.select(element[0]).append('svg')
           .attr('width', width + margin.left + margin.right)
           .attr('height', height + margin.top + margin.bottom)
           .append('g')
           .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          var parseDate = d3.time.format('%d-%b-%y').parse;

          var x = d3.time.scale()
            .range([0, width]);

          var y = d3.scale.linear()
            .range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

          svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

          svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Price ($)');

          /**** THIS LISTENS TO NEW DATA FROM THE CONTROLLER ****/
          scope.$watch('data', function(newVals, oldVals) {
            if (!oldVals) {
              console.log('oldVals is unused');
            }
            return scope.render(newVals);
          }, true);

          /*** RE-RENDER ON NEW DATA from scope.$watch ***/
          scope.render = function(data) {
            scope.data = data;

            scope.data.forEach(function(d) {
              d.date = parseDate(d.dateText);
              d.close = +d.close;
            });

            x.domain(d3.extent(scope.data, function(d) { return d.date; }));
            y.domain(d3.extent(scope.data, function(d) { return d.close; }));

            svg.selectAll('.line').remove();

            var line = d3.svg.line()
              .x(function(d) { return x(d.date); })
              .y(function(d) { return y(d.close); });

            svg.append('path')
              .datum(scope.data)
              .attr('class', 'line')
              .attr('d', line);
          };

        });
      }};
    }]);