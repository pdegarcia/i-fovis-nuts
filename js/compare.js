setTimeout(function(){ compare_map.selectFromAnyRegion("NUTS I ","0"); }, 1000);
function drawTimeLine(){
  // SLIDER
$("#timeline").empty();
var formatter = d3.format("d");
var tickFormatter = function(d) {
  return formatter(d);
};

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

function graphGanho(selectedNutsCompare, id, res){
  
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

var formatYears = d3.format("0000");
xAxis.tickFormat(formatYears);

//var escolaridades = ["Total","< Básico","= Básico","= Secundário","= Superior"]

var svg = d3.select("comparecontent").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.style("margin-left", margin.left + "px")
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/dataset.json", function(error, data1) {
  data1 = data1.document.nuts;
  
        for (var i=0; i<data1.length; i++)
        {
        if (res && res[0]==data1[i]._id ){
        //console.log("half match: " + data1[i].ambito + ":" + res[1]);
        if (res[1] === data1[i].ambito){ 
            console.log("true match!!!! @ pos: " + i)
            //console.log(data1[i])
            console.log(selectedNutsCompare);
            selectedNutsCompare.reverse();
            selectedNutsCompare.push(i);
            selectedNutsCompare.reverse();
            console.log(selectedNutsCompare);
            //var insert = selectedNutsCompare.splice(0, 0, i);
            selectedNutsCompare.pop();

            //
            //selectedNutsCompare.pop(0);
            var out = selectedNutsCompare[0]
            for (var j=1; j<5; j++){
              out += "," + selectedNutsCompare[j]
            } 
            console.log(out);
            var elem = $("#selectedNUTSCompare")[0];
            elem.innerHTML = out;
            }
          }
          
        }
        
        
  data1.forEach(function(d) {
      d.escolaridadeTotal = [[2009,d.ganhoTotal.ano2009], [2010,d.ganhoTotal.ano2010], [2011,d.ganhoTotal.ano2011], [2012,d.ganhoTotal.ano2012], [2013,d.ganhoTotal.ano2013]]
      d.escolaridadeMenorBasico = [[2009,d.inferiorBasico.ano2009], [2010,d.inferiorBasico.ano2010], [2011,d.inferiorBasico.ano2011], [2012,d.inferiorBasico.ano2012], [2013,d.inferiorBasico.ano2013]]
      d.escolaridadeIgualBasico = [[2009,d.igualBasico.ano2009], [2010,d.igualBasico.ano2010], [2011,d.igualBasico.ano2011], [2012,d.igualBasico.ano2012], [2013,d.igualBasico.ano2013]]
      d.escolaridadeIgualSecundario = [[2009,d.igualSecundario.ano2009], [2010,d.igualSecundario.ano2010], [2011,d.igualSecundario.ano2011], [2012,d.igualSecundario.ano2012], [2013,d.igualSecundario.ano2013]]
      d.escolaridadeIgualSuperior = [[2009,d.igualSuperior.ano2009], [2010,d.igualSuperior.ano2010], [2011,d.igualSuperior.ano2011], [2012,d.igualSuperior.ano2012], [2013,d.igualSuperior.ano2013]]
      d.consultas = [[2009,d.consultasPorHab.ano2009], [2010,d.consultasPorHab.ano2010], [2011,d.consultasPorHab.ano2011], [2012,d.consultasPorHab.ano2012]]
      
      
      if(id===1){ d.selected = d.escolaridadeTotal }
      else if(id===2){ d.selected = d.escolaridadeMenorBasico }
      else if(id===3){ d.selected = d.escolaridadeIgualBasico }
      else if(id===4){ d.selected = d.escolaridadeIgualSecundario }
      else if(id===5){ d.selected = d.escolaridadeIgualSuperior }
      else if(id===6){ d.selected = d.consultas }
      


      //console.log(d);
  });
  
  var dataNovo = [];
  for (var j = 0; j < selectedNutsCompare.length; j++) {
  dataNovo.push(data1[selectedNutsCompare[j]])
   
  }
  //console.log(dataNovo);

	x.domain([start_year, end_year]);
  
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
			.data(data1[selectedNutsCompare[j]].selected)
			.enter()
			.append("circle");

    console.log(":::::::::>>>>>> "+ selectedNutsCompare);
		var text = g.selectAll("text")
			.data(data1[selectedNutsCompare[j]].selected)
			.enter()
			.append("text");

		var rScale = d3.scale.linear()
			.domain([400, d3.max(data1[0].selected, function(d) { return d[1]; })+100])
      //.domain([d3.min(data1[0].selected, function(d) { return d[1]; }), d3.max(data1[0].selected, function(d) { return d[1]; })])
			.range([5, 18]);

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
			.style("display","none");
      
		g.append("text")
			.attr("y", j*50+25)
			.attr("x",-80)
			.attr("class","label")
			.text(truncate(data1[selectedNutsCompare[j]]._id,10,"..."))
			.style("fill", function(d) { return c(j); })
			.on("mouseover", mouseover)
			.on("mouseout", mouseout);
      
/*    g.append("text")
			.attr("y", -5)
			.attr("x",j*100)
			.attr("class","label")
			.text(escolaridades[j])
			//.style("fill", function(d) { return c(j); })
			.on("mouseover", mouseover)
			.on("mouseout", mouseout);*/
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
})}

function graphPoderCompraConsultas(selectedNutsCompare){
  
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

var formatYears = d3.format("0000");
xAxis.tickFormat(formatYears);

var svg = d3.select("comparecontent").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.style("margin-left", margin.left + "px")
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/dataset.json", function(error, data1) {
  data1 = data1.document.nuts;
  data1.forEach(function(d) {
      
      //console.log(d);
      d.poderCompra = [[2009,d.compraPerCapita.ano2009], [2011,d.compraPerCapita.ano2011]]
      d.selected = d.poderCompra 

  });
  
  var dataNovo = [];
  for (var j = 0; j < selectedNutsCompare.length; j++) {
  dataNovo.push(data1[selectedNutsCompare[j]])
   
  }
  console.log(dataNovo);

	x.domain([start_year, end_year]);
  
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
			.data(data1[selectedNutsCompare[j]].selected)
			.enter()
			.append("circle");

    console.log(data1[j].ganho + " "+ data1[j].selected);
		var text = g.selectAll("text")
			.data(data1[selectedNutsCompare[j]].selected)
			.enter()
			.append("text");

		var rScale = d3.scale.linear()
			//.domain([d3.min(data1[selectedNutsCompare[j]].selected, function(d) { return d[1]; }), d3.max(data1[selectedNutsCompare[j]].selected, function(d) { return d[1]; })])
      .domain([d3.min(data1[0].selected, function(d) { return d[1]; }), d3.max(data1[0].selected, function(d) { return d[1]; })])
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
})}

!(function (d3) {

$("comparecontent").empty();

var elem = $("#selectedNUTSCompare").text();

var selectedNutsCompare = elem.split(",");

var elem1 = $("#selectedSearchBox").text();

var res = elem1.split(":");

console.log(res);

graphGanho(selectedNutsCompare, 1, res);
//drawTimeLine();


  /* HANDLERS BOTOES */
  d3.selectAll("#ganhoT")
    .on("click", function () {
      console.log("Ganho Total Pressed");
      $("comparecontent").empty();
      graphGanho(selectedNutsCompare, 1);
      drawTimeLine();
      //para cada NUT seleccionado, apresentar Ganho Total
      //No caso do total, só apresenta uma bola
    });

  d3.selectAll("#ganhoIB")
    .on("click", function () {
      console.log("Ganho Inferior ao Básico Pressed");
      $("comparecontent").empty();
      graphGanho(selectedNutsCompare, 2);
      drawTimeLine();
      //para cada NUT seleccionado, apresentar Ganho IB
      //No caso do ganho IB, EB, ESec e ESup, aparecem em bolas ordenadas no eixo do Y
    });

  d3.selectAll("#ganhoEB")
    .on("click", function () {
      console.log("Ganho Equivalente ao Básico Pressed");
      $("comparecontent").empty();
      graphGanho(selectedNutsCompare, 3);
      drawTimeLine();
      //para cada NUT seleccionado, apresentar Ganho EB
    });

  d3.selectAll("#ganhoESec")
    .on("click", function () {
      console.log("Ganho Equivalente ao Secundário Pressed");
      $("comparecontent").empty();
      graphGanho(selectedNutsCompare, 4);
      drawTimeLine();
      //para cada NUT seleccionado, apresentar Ganho ESec
    });

  d3.selectAll("#ganhoESup")
    .on("click", function () {
      console.log("Ganho Equivalente ao Superior Pressed");
      $("comparecontent").empty();
      graphGanho(selectedNutsCompare, 5);
      drawTimeLine();
      //para cada NUT seleccionado, apresentar Ganho ESup
    });

  d3.selectAll("#poder")
    .on("click", function () {
      console.log("Poder de Compra per capita Pressed");
      $("comparecontent").empty();
      graphPoderCompraConsultas(selectedNutsCompare);
      drawTimeLine();
      //para cada NUT seleccionado, apresentar Poder de compra
    });

  d3.selectAll("#consultas")
    .on("click", function () {
      console.log("Consultas Pressed");
      $("comparecontent").empty();
      graphGanho(selectedNutsCompare, 6);
      drawTimeLine();
      //para cada NUT seleccionado, apresentar Consultas
    });

})(d3);
