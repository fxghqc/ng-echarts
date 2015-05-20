(function() {
  angular.module('ng-echarts', [])

  .directive('echart', ['$timeout', function($timeout) {
    
    function draw(chart, echart, option, theme, init) {
      init && (echart = echarts.init(chart, theme));
      echart.setOption(option);
      !init && echart.resize();
    };
    
    function calSize(ele, chart) {
      width  = ele.style.width  || chart.offsetWidth || '500px';
      height = ele.style.height || ele.offsetHeight  || '300px';
      
      return { width: width, height: height };
    };

    function link(scope, element, attrs) {
      var echart;
      var theme = attrs.theme;
      var option = attrs.option;
      var chart = element.find('div')[0];

      $timeout(function() {
        var size = calSize(element[0], chart);
        chart.style.width = size.width;
        chart.style.height = size.height;
        option && draw(chart, echart, option, theme, true);
      }, 100);

      scope.$watchGroup([attrs.option, attrs.theme], function(values) {
        option = values[0];
        theme = values[1];
        echart && draw(chart, echart, option, theme, false);
      });

    };

    return {
      template: '<div></div>',
      restrict: 'E',
      link: link
    };
  }]);
})();