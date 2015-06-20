(function() {
  angular.module('ng-echarts', [])

  .directive('echart', ['$timeout', '$window', function($timeout, $window) {

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
      var echart, theme, option;
      var autoResize = attrs.autoResize;
      var chart = element.find('div')[0];
      var initialized = false;

      $timeout(function() {
        var size = calSize(element[0], chart);
        chart.style.width = size.width;
        chart.style.height = size.height;
        option && (echart = draw(chart, echart, option, theme, true));
        initialized = true;
      });

      scope.$watch(attrs.theme, function(value) {
        theme = value;
        initialized && option && (echart = draw(chart, echart, option, theme, true));
      });

      scope.$watch(attrs.option, function(value) {
        option = value;
        initialized && option && (echart = draw(chart, echart, option, theme, true));
      }, true);

      scope.$watch(attrs.data, function(value) {
        value && echart.addData(value);
      });

      if (autoResize) {
        $window.addEventListener('resize', function() {
          echart.resize();
        });
      }

    };

    return {
      template: '<div></div>',
      restrict: 'E',
      link: link
    };
  }]);
})();
