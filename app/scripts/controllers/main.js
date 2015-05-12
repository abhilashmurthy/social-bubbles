'use strict';

/**
 * @ngdoc function
 * @name socialBubblesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the socialBubblesApp
 */
angular.module('socialBubblesApp')
  .controller('MainCtrl', function ($scope) {
  	$scope.addDate = function() {
		$scope.d3Data.push({
			dateText: $scope.newDate.split(',')[0],
			close: parseInt($scope.newDate.split(',')[1])
		});
  	};

  	$scope.d3Data = [
		{dateText: '4-Apr-12', close: 34},
		{dateText: '5-Apr-12', close: 45},
		{dateText: '6-Apr-12', close: 37},
		{dateText: '7-Apr-12', close: 56},
		{dateText: '8-Apr-12', close: 50},
		{dateText: '9-Apr-12', close: 77}
  	];

  	$scope.d3OnClick = function(point) {
  		$scope.$apply(function() {
  			$scope.selectedPoint = point;
  		});
  	};
  });
