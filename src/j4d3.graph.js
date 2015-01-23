
/* j4d3.Graph - Graph Object */

module.exports = Graph;

// Graph constructor.
function Graph(selector, options) {

  var defaults={
    width: 480,
    height: 250,
    margin: {top:20, right:20, bottom:60, left:40},
    interpolation: "cardinal",
    responsive: false,
    x: "timestamp",
    y: "val"
  };

  var _x = (options && options.x) || defaults.x;
  var _y = (options && options.y) || defaults.y;
  var _isResponsive = (options && options.responsive) || defaults.responsive;
  var _selector = selector;
  var _options  = options;

  var inputMargin = (options && options.margin);
  var margin = {top:    (inputMargin && inputMargin.top)    || 20,
                right:  (inputMargin && inputMargin.right)  || 20,
                bottom: (inputMargin && inputMargin.bottom) || 60,
                left:   (inputMargin && inputMargin.left)   || 40};

    var containerWidth = (options && options.width) ||
    parseInt(d3.select(selector).style('width'), 10) ||
    defaults.width;

    var containerHeight = (options && options.height) || defaults.height;

    var width  = containerWidth - margin.left - margin.right;
    var height = containerHeight - margin.top - margin.bottom;

    var svg = void 0;
    this.svg = svg;

    var _lineData = void 0;
    var _lineFunction = void 0;
    var _yAxis = void 0;
    var _xAxis = void 0;
    var _yScale = void 0;
    var _xScale = void 0;

    // Interpolation: cardinal(rickshaw default), linear, basis, step-after etc.
    var _interpolation = (options && options.interpolation) || "cardinal";

    // Create the Scale we will use for the xAxis - for now set to today 24hrs.
    _xScale = d3.time.scale()
    .domain([new Date(lineData[0].timestamp),
    d3.time.day.offset(new Date(lineData[0].timestamp),1)])
    .range([0, width]);

    // Reverse range fixes y-axis so that +ve direction is upwards.
    _yScale = d3.scale.linear().range([height, 0]);

    // Accessor function.
    _lineFunction = d3.svg.line()
    .x(function(d) { return _xScale(new Date(d[_x])); })
    .y(function(d) { return _yScale(d[_y]); })
    .interpolate(_interpolation);

    // Create the x-axis.
    _xAxis = d3.svg.axis()
    .scale(_xScale)
    .orient("bottom")         // Horizontal axis with ticks below.
    .ticks(d3.time.hours, 3)             // 3 ticks per hour.
    .tickFormat(d3.time.format('%H:%M')) //'%Y-%m-%d %H:%M'
    .tickSize(-height,0)
    .tickPadding(8);

    // Create y-axis.
    _yAxis = d3.svg.axis()
    .scale(_yScale)
    .orient("left")
    .tickSize(-width, 10, 0)
    .tickPadding(6);

    // Create SVG container with margins and grouped tranalation to compensate for margins.
    svg = d3.select(selector).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

    // Create a group element for the x-axis.
    var xAxisGroup = svg.append("g")
    .attr("class", "x axis")
    // Move the x-axis down to bottom of svg container.
    .attr("transform", "translate(0," + height + ")");

    // Create a group element for the y-axis.
    var yAxisGroup = svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)");

    // Create svg path container.
    var lineGraph = svg.append("path")
    .attr("class", "line")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("fill", "none");

    // Bind data to the svg path.
    svg.select("path.line").data([lineData]);

    // Create a group element for the x-axis.
    var xAxisGroup = svg.append("g")
    .attr("class", "x axis")
    // Move the x-axis down to bottom of svg container.
    .attr("transform", "translate(0,"+ height + ")");

    // Create a group element for the y-axis.
    var yAxisGroup = svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)");

    // Draw x-axis once, and rotate tick text.
    drawOnResize();

    function drawOnResize(){
      svg.select("g.x.axis")
      .call(_xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.3em")
      .attr("transform", function(d) {return "rotate(-65)" });
    }

    if (_isResponsive){ // Handle window resize events.
      var self = this;

      d3.select(window).on('resize', resize);

      function resize() {

        // Update properties dependent on width.
        contWidth = parseInt(d3.select(_selector).style('width'), 10);
        width = contWidth - margin.left - margin.right;

        // Reset x scale range.
        _xScale.range([0, width]);

        // Update svg element width.
        svgElement = d3.select(selector + " svg").attr("width", contWidth);

        // Update y-axis ticks (only needed if ticks span width for grid display).
        _yAxis.tickSize(-width, 10, 0);

        // Do the actual resize... use data already bound to svg line.
        var currData = svg.select("path.line").data()[0];

        self.draw(_lineData, true);
      }
    }

    this.draw = function(data, isResize){

      // If graph is responsive width may have changed.
      if(_isResponsive && isResize){
        drawOnResize();
      }

      _lineData = data;

      // Update yScale domain to cater for potentially increased y-axis range.
      _yScale.domain([0, d3.max(_lineData, function(d) { return d[_y]; })]);

      // Bind data to line.
      svg.select("path.line").data([_lineData]);

      // Draw y axis and path with transition for animation.
      svg.select("g.y.axis").transition().call(_yAxis);
      svg.select("path.line").transition().attr("d", _lineFunction);

    };

}
