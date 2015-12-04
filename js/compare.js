function graphGanho(){
  

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


// Get the data ------------------------------- our data ----------------------------------

var elem = $("#selectedNUTS").text();
console.log(elem);

d3.json("data/dataset-sample.json", function(error, data) {
  data1 = data.document.nuts;
  data1.forEach(function(d) {
      d.escolaridadeTotal = [[2009,d.ganhoTotal.ano2009], [2010,d.ganhoTotal.ano2010], [2011,d.ganhoTotal.ano2011], [2012,d.ganhoTotal.ano2012], [2013,d.ganhoTotal.ano2013]]
      //console.log(d.compraPerCapita);
      if(d._id==elem){
        console.log("looool");
      }
      console.log(d._id===elem)
  });
  


// Get the data
d3.csv("data1.csv", function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });

  // Scale the range of the data
  x.domain([2009, d3.max(data1[4].escolaridadeTotal, function(d) { //console.log(d[1]);
                                          return d[0]; })]);
  y.domain([0, d3.max(data1[4].escolaridadeTotal, function(d) { //console.log(d[1]);
                                          return d[1]; })]);

  var line = d3.svg.line()
 			// assign the X function to plot our line as we wish
 			.x(function(d) {
        // console.log(d);
 				// verbose logging to show what's actually being done
 				 console.log('Plotting X value for data point: ' + d[0] + ' to be at: '+ x(d[0]) + ' using our xScale.');
 				// return the X coordinate where we want to plot this datapoint
 				return x(d[0]);
 			})
 			.y(function(d) {
 				// verbose logging to show what's actually being done
 				 console.log('Plotting Y value for data point: ' + d[1] + ' to be at: ' + y(d[0]) + " using our yScale.");
 				// return the Y coordinate where we want to plot this datapoint
 				return y(d[1]);
 			})
  // Add the valueline path.
  chart1.append("path")
    .attr("class", "line")
    .attr("d", line(data1[4].escolaridadeTotal));

//bars
  var barWidth = 40;

  var bar = chart1.selectAll("g")
      .data(data1[4].escolaridadeTotal)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

  bar.append("rect")
      .attr("y", function(d) { return 0; })
      .attr("fill", "steelblue")
      .attr("height", function(d) { return d[1]-700; })
      .attr("width", barWidth - 1);

  bar.append("title")
      .attr("dy", ".75em")
      .text(function(d) { return (d[0] + " : " + d[1] +"€") });
  // Add the X Axis
  chart1.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add the Y Axis
  chart1.append("g")
    .attr("class", "y axis")
    .call(yAxis);

})});
};

function drawTimeLine(){
  // SLIDER
$("#timeline").empty();
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
  
};

function graphGanho1(){
  
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
$("#timeline").empty();
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

function animate(){
  
}

// Get the data ------------------------------- our data ----------------------------------



d3.json("data/dataset-sample.json", function(error,data) {
  dataset = data.data;
  //console.log(data);


  dataset.forEach(function(d) {
    //console.log(d)
    if (d.Territórios) {
     // console.log(d.Territórios);

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

})
 
}


!(function (d3) {

$("comparecontent").empty();

graphGanho();
drawTimeLine();

})(d3);
