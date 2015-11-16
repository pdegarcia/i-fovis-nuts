var dataset;

d3.json("test_spoon.json", function (data) {
    dataset = data;
    
     gen_vis();
})

function gen_vis() {
	var w = 1000;
    var h = 400;
    var padding = 10;
    var bar_w = 25;

    var hscale = d3.scale.linear()
					 .domain([10,0]) 
					 .range([padding,h-padding]);

	var xscale = d3.scale.linear()
						 .domain([0,dataset.length]) 
						 .range([padding,w-padding]);

	var yaxis = d3.svg.axis()
                  .scale(hscale)
                  .orient("left");

	var xaxis = d3.svg.axis()
					.scale(d3.scale.linear() 
						.domain([dataset[0].oscar_year,dataset[dataset.length-1].oscar_year]) 
						.range([padding+bar_w/2,w-padding-bar_w/2]))
					.tickFormat(d3.format("f")) 
					.ticks(dataset.length/2) 
					.orient("bottom");

    var svg = d3.select("#the_chart");
    svg = svg.append("svg");
    svg = svg.attr("width",w);
    svg = svg.attr("height",h);

    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("width",Math.floor((w-padding*2)/dataset.length)-1)
	   .attr("height",function(d) {
						return hscale(d.rating);
                })
       .attr("fill","purple")
	   .attr("x",function(d, i) {
					return xscale(i);
				}) 
	   .attr("y",function(d) {
                  	return h-padding-hscale(d.rating);
				})
	   .append("title")
			.text(function(d) { return d.title;});

	svg.append("g")
   	   .attr("transform","translate(10,0)")
   	   .attr("class", "y axis")
	   .call(yaxis);

	svg.append("g")
	   .attr("transform","translate(0,390)")
	   .attr("class", "x axis")
	   .call(xaxis);
}
