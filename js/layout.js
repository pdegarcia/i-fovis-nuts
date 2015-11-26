$(document).ready(function() {
	var h = $(window).height();
	var t_container_W = $(".chart-container").width()*0.7 -40;
	
	$(".globalcontainer").css("height", h*0.75);
	$("#timeline").css("width", t_container_W);
	
});