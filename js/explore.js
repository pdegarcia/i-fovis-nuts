
function graphBarGanho(selectedNuts, id){

var h = $(".graph-container").height();
var w = $(".graph-container").width();


// Set the dimensions of the canvas / graph
var margin = {top: h*0.05, right: w*0.025, bottom: h*0.05, left: w*0.06},
  width = w*0.45 - margin.left - margin.right,
  height = h*0.45 - margin.top - margin.bottom;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var c = d3.scale.category20();

// Define the axes
var xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(6);
  
var formatYears = d3.format("0000");
xAxis.tickFormat(formatYears); 

// Define the line
var valueline = d3.svg.line()
  .x(function(d) { return x(d[0]); })
  .y(function(d) { //console.log(y(d[1])+height + " ::::");
  return y(d[1]); });

// Adds the svg canvas - PRIMEIRO GRAFICO - GANHO POR NIVEL DE ESCOLARIDADE
var chart = d3.select("explorecontent").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

console.log("recebi isto: " + id);
// Get the data
d3.json("data/dataset.json", function(error, data) {
  data = data.document.nuts;
  data.forEach(function(d) {     
      d.escolaridadeTotal = [[2009,d.ganhoTotal.ano2009], [2010,d.ganhoTotal.ano2010], [2011,d.ganhoTotal.ano2011], [2012,d.ganhoTotal.ano2012], [2013,d.ganhoTotal.ano2013]]
      d.escolaridadeMenorBasico = [[2009,d.inferiorBasico.ano2009], [2010,d.inferiorBasico.ano2010], [2011,d.inferiorBasico.ano2011], [2012,d.inferiorBasico.ano2012], [2013,d.inferiorBasico.ano2013]]
      d.escolaridadeIgualBasico = [[2009,d.igualBasico.ano2009], [2010,d.igualBasico.ano2010], [2011,d.igualBasico.ano2011], [2012,d.igualBasico.ano2012], [2013,d.igualBasico.ano2013]]
      d.escolaridadeIgualSecundario = [[2009,d.igualSecundario.ano2009], [2010,d.igualSecundario.ano2010], [2011,d.igualSecundario.ano2011], [2012,d.igualSecundario.ano2012], [2013,d.igualSecundario.ano2013]]
      d.escolaridadeIgualSuperior = [[2009,d.igualSuperior.ano2009], [2010,d.igualSuperior.ano2010], [2011,d.igualSuperior.ano2011], [2012,d.igualSuperior.ano2012], [2013,d.igualSuperior.ano2013]]
      

      if(id==1){ d.selected = d.escolaridadeTotal }
      else if(id==2){ d.selected = d.escolaridadeMenorBasico }
      else if(id==3){ d.selected = d.escolaridadeIgualBasico }
      else if(id==4){ d.selected = d.escolaridadeIgualSecundario }
      else if(id==5){ d.selected = d.escolaridadeIgualSuperior }
      
      
  });
  // Scale the range of the data

  x.domain([2009,d3.max(data[selectedNuts].selected, function(d) { return d[0]; })]);
  //y.domain([0, d3.max(data[0].escolaridadeTotal, function(d) { return d[1]; })]);
  y.domain([0, 3000]);

  // Add the valueline of Portugal median  
  chart.append("path")
    .attr("class", "line")
    .attr("d", valueline(data[0].selected))
    .style("stroke","red")
    .style("stroke-linecap","round")
    .style("stroke-width","1")
    .style("stroke-dasharray","5,5");

  // Add the valueline path.
  chart.append("path")
    .attr("class", "line")
    .attr("d", valueline(data[selectedNuts].selected));

  //bars
  
  var barWidth = 10;
  
  
  var bar = chart.selectAll("g")
      .data(data[selectedNuts].selected)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x(d[0]) + ",0)"; });
                                                        // i * barWidth
                                                                                                       
  bar.append("rect")
      .attr("y", function(d) { return y(d[1])-5; })
      .attr("fill", "steelblue")
      .attr("height", 10)//function(d) { return height-y(d[1]); })
      .attr("width", barWidth - 1)
      .on("mouseover", mouseover)
			.on("mouseout", mouseout);

  bar.append("title")
      .attr("dy", ".75em")
      .text(function(d,i) {   var dif = d[1]-data[0].selected[i][1]
                              return (data[selectedNuts]._id + ": " + d[0] + " : " + d[1] +"€ | Diferença: " + dif) });

  // Add the X Axis
  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add the Y Axis
  chart.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  chart.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Ganho Total - Todas as Escolaridades");
    
    
  

})

	function mouseover(p) {
		var g = d3.select(this).node().parentNode;
		//d3.select(g).selectAll("rect").style("display","none");
    d3.select(g).selectAll("rect").attr("fill", "darkblue")
                                  .style("display","block");
		d3.select(g).selectAll("text.value").style("display","block");
	}

	function mouseout(p) {
		var g = d3.select(this).node().parentNode;
		d3.select(g).selectAll("rect").attr("fill", "steelblue")
                                  .style("display","block");
		d3.select(g).selectAll("text.value").style("display","none");
	}
  }


!(function (d3) {

$("explorecontent").empty();

var elem = $("#selectedNUTS").text();
var selectedNuts = elem;

  var elem1 = $("#selectedCat").text();
  var res = elem +":"+elem1;
  console.log(res);

elem = $("#selectedGanho").text();
var selectedGanho = elem;

graphBarGanho(selectedNuts, selectedGanho);

var h = $(".graph-container").height();
var w = $(".graph-container").width();

// Set the dimensions of the canvas / graph
var margin = {top: h*0.05, right: w*0.025, bottom: h*0.05, left: w*0.06},
  width = w*0.45 - margin.left - margin.right,
  height = h*0.45 - margin.top - margin.bottom;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(5);
  
var formatYears = d3.format("0000");
xAxis.tickFormat(formatYears); 


// Adds the svg canvas - SEGUNDO GRAFICO - PODER DE COMPRA PER CAPITA
var chart2 = d3.select("explorecontent")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data/dataset.json", function(error, data) {
  data = data.document.nuts;
  data.forEach(function(d) {
      d.poderCompra = [[2009,d.compraPerCapita.ano2009], [2011,d.compraPerCapita.ano2011]]
      //console.log(d.compraPerCapita);
  });

  // Scale the range of the data
  x.domain([2009, d3.max(data[selectedNuts].poderCompra, function(d) { //console.log(d);
                                                    return d[0]; })]);
  y.domain([0, 300]);

var line1 = d3.svg.line()
 			// assign the X function to plot our line as we wish
 			.x(function(d) { return x(d[0]);	})
 			.y(function(d) { return y(d[1]); })
       
  // Add the valueline of Portugal median  
  chart2.append("path")
    .attr("class", "line")
    .attr("d", line1(data[0].poderCompra))
    .style("stroke","red")
    .style("stroke-linecap","round")
    .style("stroke-width","1")
    .style("stroke-dasharray","5,5");

  // Add the valueline path.
  chart2.append("path")
    .attr("class", "line")
    .attr("d", line1(data[selectedNuts].poderCompra));


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

// Define the axes
  yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(8);

// Get the data

d3.json("data/dataset.json", function(error, data) {
  data = data.document.nuts;
  data.forEach(function(d) {
      d.consultas = [[2009,d.consultasPorHab.ano2009], [2010,d.consultasPorHab.ano2010], [2011,d.consultasPorHab.ano2011], [2012,d.consultasPorHab.ano2012]]
      //console.log(d);
  });


  // Scale the range of the data
  x.domain([2009, d3.max(data[selectedNuts].consultas, function(d) { //console.log(d[0]);
                                          return d[0]; })]);
  y.domain([0, 8]);

var line = d3.svg.line()
 			// assign the X function to plot our line as we wish
 			.x(function(d) {
        // console.log(d);
 				// verbose logging to show what's actually being done
 				// console.log('Plotting X value for data point: ' + d[0] + ' to be at: '+ x(d[0]) + ' using our xScale.');
 				// return the X coordinate where we want to plot this datapoint
 				return x(d[0]);
 			})
 			.y(function(d) {
 				// verbose logging to show what's actually being done
 				// console.log('Plotting Y value for data point: ' + d[1] + ' to be at: ' + y(d[0]) + " using our yScale.");
 				// return the Y coordinate where we want to plot this datapoint
 				return y(d[1]);
 			})
  // Add the valueline of Portugal median  
  chart3.append("path")
    .attr("class", "line")
    .attr("d", line(data[0].consultas))
    .style("stroke","red")
    .style("stroke-linecap","round")
    .style("stroke-width","1")
    .style("stroke-dasharray","5,5");
       
  // Add the valueline path.
  chart3.append("path")
    .attr("class", "line")
    .attr("d", line(data[selectedNuts].consultas));
    
    
  //bars
  
  var barWidth = 10;

  var bar = chart3.selectAll("g")
      .data(data[selectedNuts].consultas)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x(d[0]) + ",0)"; });

 bar.append("rect")
      .attr("y", function(d) { return y(d[1])-5; })
      .attr("fill", "steelblue")
      .attr("height", 10)
      .attr("width", barWidth - 1)
      .on("mouseover", mouseover)
			.on("mouseout", mouseout);

  bar.append("title")
      .attr("dy", ".75em")
      .text(function(d, i) { var dif = d[1]-data[0].consultas[i][1]
                          //console.log(dif);
                          return (data[selectedNuts]._id + ": " + d[1] + " por habitante | Diferença: " + dif) });

  // Add the X Axis
  chart3.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add the Y Axis
  chart3.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  // Add the title
  chart3.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Consultas por Habitante");

});

	function mouseover(p) {
		var g = d3.select(this).node().parentNode;
		//d3.select(g).selectAll("rect").style("display","none");
    d3.select(g).selectAll("rect").attr("fill", "darkblue")
                                  .style("display","block");
		d3.select(g).selectAll("text.value").style("display","block");
	}

	function mouseout(p) {
		var g = d3.select(this).node().parentNode;
		d3.select(g).selectAll("rect").attr("fill", "steelblue")
                                  .style("display","block");
		d3.select(g).selectAll("text.value").style("display","none");
	}

})(d3);
