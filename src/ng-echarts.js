(function() {
  angular.module('ng-echarts', [])

  .directive('echart', ['$timeout', function($timeout) {
    
    function draw(chart, echart, option, theme, init) {
      init && (echart = echarts.init(chart, theme));
      echart.setOption(option);
      return echart;
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
        option && (echart = draw(chart, echart, option, theme, true));
      });

      scope.$watchGroup([attrs.option, attrs.theme, attrs.data], function(values) {
        option = values[0];
        theme = values[1];
        data = values[2];
        data && echart.addData(data);
      });

    };

    return {
      template: '<div></div>',
      restrict: 'E',
      link: link
    };
  }]);
})();
