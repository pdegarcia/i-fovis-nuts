!(function (d3) {

function checkIt(data) {
    data = data.document.nuts;

    //var regexp = new RegExp(',');
    var nutsByName = d3.nest()
        .key(function (d) {
          var nome =d.ambito + " : " + d._id
        return nome;
    })
        .entries(data);
// creating dropdown
    var data = JSON.stringify(nutsByName);
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
        //console.log("your selection is");
        //console.dir(uniqueData[selectedIndex].values[0]);

        //making Pie
        function makePie() {
        return ("you selected: " + " " + selection.text());
        };
        var elem = $("#selectedNUTS")[0];
        elem.innerHTML = selectedIndex;
        
        elem = $("#selectedCat")[0];
        elem.innerHTML = selection.text();
        
        $.getScript("js/explore.js");
        //alert(makePie());
    };

d3.select("#dropdown_container").on("change", changePie);
};

function loadCat(data) {
    data = data.document.categories;

    var categories = d3.nest()
          .key(function (d) {
            var nome = d._name;
          return nome; })
          .entries(data);

    var data = JSON.stringify(categories);
    var data = JSON.parse(data);

    var dropCloropleth = d3.select("#dropdownCloropleth_container")
                          .append("select")
                          .attr("class", "selection")
                          .attr("name", "country-list");

    var optionsCloro = dropCloropleth.selectAll("option")
                  .data(data)
                  .enter()
                  .append("option");

    optionsCloro.text(function (d) { return d.key; })
           .attr("value", function (d) { return d.key; });

    var changePie = function() {
       var selectedValue = d3.event.target.value;
       var selectedIndex = d3.event.target.selectedIndex;
       
       var selectedDOMElement = d3.event.target.children[selectedIndex];
       var selection = d3.select(selectedDOMElement);

       // subsetting data
       var uniqueData = d3.nest()
           .key(function(selection) { return selection.key; })
           .entries(data)
           .map(function(entry) { return entry.values[0]; });

       //console.log("your selection is");
       //console.dir(uniqueData[selectedIndex].values[0]);

       //making Pie
       function makePie() {
         return ("you selected: " + " " + selection.text());
       };

       var elem = $("#selectedCat")[0];
       elem.innerHTML = selection.text();
       //alert(makePie());*/
   };

    d3.select("#dropdownCloropleth_container").on("change", changePie);
};

d3.json("data/dataset.json", checkIt);
d3.json("data/categories.json", loadCat);

})(d3);
