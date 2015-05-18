(function() {
  angular.module('ng-echarts', [])

  .directive('echart', [

  function() {

    function link(scope, element, attrs) {
      var chart = echarts.init(element[0]);

      scope.$watch(attrs.option, function(value) {
        chart.setOption(attrs.option);
      });
      
    };
    
    return {
      restrict: 'E',
      link: link
    };
  }]);
})();