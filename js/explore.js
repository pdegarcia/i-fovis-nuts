!(function (d3) {

$("explorecontent").empty();

var h = $(".graph-container").height();
var w = $(".graph-container").width();

// Set the dimensions of the canvas / graph
var margin = {top: h*0.05, right: w*0.025, bottom: h*0.05, left: w*0.06},
  width = w*0.45 - margin.left - margin.right,
  height = h*0.45 - margin.top - margin.bottom;

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
    
// Adds the svg canvas - PRIMEIRO GRAFICO - GANHO POR NIVEL DE ESCOLARIDADE
var chart1 = d3.select("explorecontent")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
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

  chart1.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("font-weight", "bold")  
    .text("Ganho Por Nível de Escolaridade");

});

// Adds the svg canvas - SEGUNDO GRAFICO - PODER DE COMPRA PER CAPITA
var chart2 = d3.select("explorecontent")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
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
  chart2.append("path")
    .attr("class", "line")
    .attr("d", valueline(data));

  // Add the X Axis
  chart2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add the Y Axis
  chart2.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  chart2.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("font-weight", "bold")  
    .text("Poder de Compra per capita");

});

// Adds the svg canvas - TERCEIRO GRAFICO - CONSULTAS POR HABITANTE
var chart3 = d3.select("explorecontent")
  .append("svg")
    .attr("width", width + (margin.left + w*0.25) + margin.right)
    .attr("height", height + (margin.top + h*0.05) + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + (margin.left + w*0.25) + "," + (margin.top + h*0.05) + ")");
    
// Get the data

d3.json("data/dataset.json", function(error, data) {
  data = data.document.nuts;
  data.forEach(function(d) {
    if (d._id ==="Portugal"){
    console.log(d);
      d.date = 2009, 2010, 2011, 2012;
      d.a2009 = d.consultasPorHab.ano2009;
      d.a2010 = d.consultasPorHab.ano2010;
      console.log(d.a2009)
      d.close = +d.a2010
      d.date = 2009;
    }
    
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.close; })]);

  // Add the valueline path.
  chart3.append("path")
    .attr("class", "line")
    .attr("d", valueline(data));

  // Add the X Axis
  chart3.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add the Y Axis
  chart3.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  chart3.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("font-weight", "bold")  
    .text("Consultas por Habitante");

});


})(d3);