!(function (d3) {

$("comparecontent").empty();
var h = $(".exploregraph-container").height(); //298
var w = $(".exploregraph-container").width();  //504


// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
  width = w - margin.left - margin.right,
  height = h - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.close); });

// Adds the svg canvas
var chart1 = d3.select("comparecontent")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// SLIDER

var formatter = d3.format("d");
var tickFormatter = function(d) {
  return "Ano " + formatter(d);
}

var slider = d3.slider().min(2009).max(2013).ticks(5).tickFormat(tickFormatter);
d3.select('#timeline').call(slider);

d3.select('#play')
  .attr("title", "Play Animation")
  .on("click", function(){
    if(!isPlaying) {
      isPlaying = true;
      d3.select(this).classed("pause", true).attr("title", "Pause Animation");
      //animate aqui
    } else {
      isPlaying = false;
      d3.select(this).classed("pause", false).attr("title", "Play Animation");
      //stop animate
    }
  });

//Play
var isPlaying = false;

// Get the data ------------------------------- our data ----------------------------------



d3.json("data/dataset-sample.json", function(error,data) {
  dataset = data.data;
  //console.log(data);


  dataset.forEach(function(d) {
    //console.log(d)
    if (d.Territórios) {
      console.log(d.Territórios);

    }
  })
  });


// Get the data
d3.csv("data1.csv", function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.close; })]);

  // Add the valueline path.
  chart1.append("path")
    .attr("class", "line")
    .attr("d", valueline(data));

  // Add the X Axis
  chart1.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add the Y Axis
  chart1.append("g")
    .attr("class", "y axis")
    .call(yAxis);

});

})(d3);
