!(function (d3) {

function checkIt(data) {
    data = data.document.nuts;
    
    //var regexp = new RegExp(',');
    var nutsByName = d3.nest()
        .key(function (d) {
          var nome = d.ambito + ":" + d._id 
        return nome; 
    })
        .entries(data);
// creating dropdown    
    var data = JSON.stringify(nutsByName)
    var data = JSON.parse(data);
	var dropDown = d3.select("#dropdown_container")
                   .append("select")
                   .attr("class", "selection")
                    .attr("name", "country-list");

    var options = dropDown.selectAll("option")
                  .data(data)
                  .enter()
                  .append("option");
         options.text(function (d) { return d.key; })
       .attr("value", function (d) { return d.key; });

// detecting change in drop down
var changePie = function() {
    //get the data value and index from the event
    var selectedValue = d3.event.target.value;
    var selectedIndex = d3.event.target.selectedIndex;
    
    //alert("You selected the option at index " + selectedIndex + ", with value attribute "+ selectedValue);
    
    var selectedDOMElement =
        d3.event.target.children[selectedIndex];
    var selection = d3.select(selectedDOMElement);

// subsetting data    
var uniqueData = d3.nest()
    .key(function(selection) { return selection.key; })
    .entries(data)
    .map(function(entry) { return entry.values[0]; });

//Output selected country with all its values
    console.log("your selection is");
    console.dir(uniqueData[selectedIndex].values[0]);
    
   // var elem = $("#info")[0];
        // alert(elem);
    //elem.innerHTML = "Selected Regions:<br />" + selection.text());
    
    //making Pie 
function makePie() {
return ("you selected: " + " " + selection.text())
};
    var elem = $("#info")[0];
    elem.innerHTML = "Selected Regions:<br />" + selection.text();
    //alert(makePie());
};   

d3.select("#dropdown_container").on("change", changePie);           
};

d3.json("data/dataset.json", checkIt);
})(d3);
