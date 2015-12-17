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

  /* HANDLERS BOTOES */
  d3.selectAll("#ganhoT")
    .on("click", function () {
      console.log("Ganho Total Pressed");
      //para cada NUT seleccionado, apresentar Ganho Total
      //No caso do total, só apresenta uma bola
    });

  d3.selectAll("#ganhoIB")
    .on("click", function () {
      console.log("Ganho Inferior ao Básico Pressed");
      //para cada NUT seleccionado, apresentar Ganho IB
      //No caso do ganho IB, EB, ESec e ESup, aparecem em bolas ordenadas no eixo do Y
    });

  d3.selectAll("#ganhoEB")
    .on("click", function () {
      console.log("Ganho Equivalente ao Básico Pressed");
      //para cada NUT seleccionado, apresentar Ganho EB
    });

  d3.selectAll("#ganhoESec")
    .on("click", function () {
      console.log("Ganho Equivalente ao Secundário Pressed");
      //para cada NUT seleccionado, apresentar Ganho ESec
    });

  d3.selectAll("#ganhoESup")
    .on("click", function () {
      console.log("Ganho Equivalente ao Superior Pressed");
      //para cada NUT seleccionado, apresentar Ganho ESup
    });

  d3.selectAll("#poder")
    .on("click", function () {
      console.log("Poder de Compra per capita Pressed");
      //para cada NUT seleccionado, apresentar Poder de compra
    });

  d3.selectAll("#consultas")
    .on("click", function () {
      console.log("Consultas Pressed");
      //para cada NUT seleccionado, apresentar Consultas
    });
};

function drawTimeLine(){
  // SLIDER
$("#timeline").empty();
var formatter = d3.format("d");
var tickFormatter = function(d) {
  return formatter(d);
}

var slider = d3.slider().min(2009).max(2013).ticks(5).tickFormat(tickFormatter);
d3.select('#timeline').call(slider);

d3.select("#timeline .dragger")
  .on("click", function (d) {drawYear(d)});

d3.select('#play')
  .attr("title", "Play Animation")
  .on("click", function(){
    if(!isPlaying) {
      isPlaying = true;
      d3.select(this).classed("pause", true).attr("title", "Pause Animation");
      animate();
    } else {
      isPlaying = false;
      d3.select(this).classed("pause", false).attr("title", "Play Animation");
      clearInterval( interval );
    }
  });

//Play
var isPlaying = false,
    interval,
    currentFrame = 0,
    frameLength = 500;

function drawYear(year) {
  var result = Math.floor(year);
  //console.log(result);
  if(year >= 0 && year < 153 || year >= 2009 && year < 2010){
    console.log("Ano 2009!");
    //dump dados ano 2009, para categorias e NUTs seleccionados
  } else if (year >= 153 && year < 306 || year >= 2010 && year < 2011) {
    console.log("Ano 2010!");
    //dump dados ano 2010, para categorias e NUTs seleccionados
  } else if (year >= 306 && year < 459 || year >= 2011 && year < 2012) {
    console.log("Ano 2011!");
    //dump dados ano 2011, para categorias e NUTs seleccionados
  } else if (year >= 459 && year < 612 || year >= 2012 && year < 2013) {
    console.log("Ano 2012!");
    //dump dados ano 2012, para categorias e NUTs seleccionados
  } else if (year == 612 || year == 2013) {
    console.log("Ano 2013!");
    //dump dados ano 2013, para categorias e NUTs seleccionados
  }
};

function animate(){
  interval = setInterval( function(){
    var aux;

    d3.select("#timeline .dragger")
      .transition()
      .ease("linear")
      .attr("transform", "translate(" + currentFrame + ")" )
    slider.value(currentFrame)

    drawYear(currentFrame);
    currentFrame += 153,75;

    if ( currentFrame == 765 ){
      console.log("entrei");
      isPlaying = false;
      d3.select("#play").classed("pause",false).attr("title","Play animation");
      clearInterval( interval );
      currentFrame = 0
      return;
    }

  },frameLength);
};

}

function graphGanho1(selectedNutsCompare){
  
function truncate(str, maxLength, suffix) {
	if(str.length > maxLength) {
		str = str.substring(0, maxLength + 1); 
		str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
		str = str + suffix;
	}
	return str;
}

var h = $(".exploregraph-container").height(); //298
var w = $(".exploregraph-container").width();  //504

// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 60, bottom: 30, left: 80},
  width = w - margin.left - margin.right,
  height = h - margin.top - margin.bottom;


//var margin = {top: 20, right: 200, bottom: 0, left: 20},
//	width = 350,
//	height = 650;

var start_year = 2009,
	end_year = 2013;

var c = d3.scale.category20();

var x = d3.scale.linear()
	.range([0, width]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("top")
  .ticks(5);

//var formatYears = d3.format("0000");
//xAxis.tickFormat(formatYears);

var svg = d3.select("comparecontent").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.style("margin-left", margin.left + "px")
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/dataset.json", function(error, data1) {
  data1 = data1.document.nuts;
  data1.forEach(function(d) {
      d.escolaridadeTotal = [[2009,d.ganhoTotal.ano2009], [2010,d.ganhoTotal.ano2010], [2011,d.ganhoTotal.ano2011], [2012,d.ganhoTotal.ano2012], [2013,d.ganhoTotal.ano2013]]
      d.escolaridadeMenorBasico = [[2009,d.inferiorBasico.ano2009], [2010,d.inferiorBasico.ano2010], [2011,d.inferiorBasico.ano2011], [2012,d.inferiorBasico.ano2012], [2013,d.inferiorBasico.ano2013]]
      d.escolaridadeIgualBasico = [[2009,d.igualBasico.ano2009], [2010,d.igualBasico.ano2010], [2011,d.igualBasico.ano2011], [2012,d.igualBasico.ano2012], [2013,d.igualBasico.ano2013]]
      d.escolaridadeIgualSecudanrio = [[2009,d.igualSecundario.ano2009], [2010,d.igualSecundario.ano2010], [2011,d.igualSecundario.ano2011], [2012,d.igualSecundario.ano2012], [2013,d.igualSecundario.ano2013]]
      d.escolaridadeIgulaSuperior = [[2009,d.igualSuperior.ano2009], [2010,d.igualSuperior.ano2010], [2011,d.igualSuperior.ano2011], [2012,d.igualSuperior.ano2012], [2013,d.igualSuperior.ano2013]]

      d.ganho = [[2009,d.ganhoTotal.ano2009],[2009,d.inferiorBasico.ano2009],[2009,d.igualBasico.ano2009],[2009,d.igualSecundario.ano2009],[2009,d.igualSuperior.ano2009]]
      //console.log(d.compraPerCapita);
      //console.log(d);
  });
  
  var dataNovo = [];
  for (var j = 0; j < selectedNutsCompare.length; j++) {
  dataNovo.push(data1[selectedNutsCompare[j]])
   
  }
  console.log(dataNovo);

d3.json("data/journals_tacs.json", function(data) {
  
	x.domain(selectedNutsCompare);
  
	var xScale = d3.scale.linear()
		.domain([start_year, end_year])
		.range([0, width]);
    
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + 0 + ")")
		.call(xAxis);

	for (var j = 0; j < selectedNutsCompare.length; j++) {
		var g = svg.append("g").attr("class","journal");
    
		var circles = g.selectAll("circle")
			.data(data1[selectedNutsCompare[j]].escolaridadeTotal)
			.enter()
			.append("circle");

    console.log(data1[j].ganho + " "+ data1[j].escolaridadeTotal + " :  " + data[j]['articles']);
		var text = g.selectAll("text")
			.data(data1[selectedNutsCompare[j]].escolaridadeTotal)
			.enter()
			.append("text");

		var rScale = d3.scale.linear()
			.domain([650, d3.max(data1[selectedNutsCompare[j]].escolaridadeTotal, function(d) { return d[1]; })])
			.range([3, 18]);

		circles
			.attr("cx", function(d, i) { return xScale(d[0]); })
			.attr("cy", j*50+20)
			.attr("r", function(d) { return rScale(d[1]); })
			.style("fill", function(d) { return c(j); });

		text
			.attr("y", j*50+20)
			.attr("x",function(d, i) { return xScale(d[0])-15; })
			.attr("class","value")
			.text(function(d){ return d[1]; })
			.style("fill", function(d) { return c(j); })
			.style("display","block");
      
		g.append("text")
			.attr("y", j*50+25)
			.attr("x",-80)
			.attr("class","label")
			.text(truncate(data1[selectedNutsCompare[j]]._id,10,"..."))
			.style("fill", function(d) { return c(j); })
			.on("mouseover", mouseover)
			.on("mouseout", mouseout);
      
    g.append("text")
			.attr("y", 10)
			.attr("x",j*50+25)
			.attr("class","label")
			.text(truncate(data1[selectedNutsCompare[j]]._id,10,"..."))
			.style("fill", function(d) { return c(j); })
			.on("mouseover", mouseover)
			.on("mouseout", mouseout);
	};

	function mouseover(p) {
		var g = d3.select(this).node().parentNode;
		d3.select(g).selectAll("circle").style("display","none");
		d3.select(g).selectAll("text.value").style("display","block");
	}

	function mouseout(p) {
		var g = d3.select(this).node().parentNode;
		d3.select(g).selectAll("circle").style("display","block");
		d3.select(g).selectAll("text.value").style("display","none");
	}
})})
}

!(function (d3) {

$("comparecontent").empty();

var elem = $("#selectedNUTSCompare").text();

var selectedNutsCompare = [4,6,3,6,20];

graphGanho1(selectedNutsCompare);
//drawTimeLine();

})(d3);
