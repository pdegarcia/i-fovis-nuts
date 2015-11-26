var C_selectedRegions=[];


var C_cities = {
	map : "portugalLow",
	getAreasFromMap : true,
	zoomLevel: 4,
};

var C_NUTS3 = {
	map : "continentsLow",
	getAreasFromMap : true,
	zoomLevel: 3,
	areas: [ {
		id: "PT-13",
		groupId: "Lisboa"
	},{
		id: "PT-15",
		groupId: "Lisboa"	
	},
	{
		id: "PT-16",
		groupId: "Beiras e Serra da Estrela"	
	},
	{
		id: "PT-17",
		groupId: "Beiras e Serra da Estrela"	
	},
	{
		id: "PT-28",
		groupId: "Beiras e Serra da Estrela"	
	},
	{
		id: "PT-7",
		groupId: "Beira Baixa"	
	},
	{
		id: "PT-21",
		groupId: "Beira Baixa"	
	},
	{
		id: "PT-5",
		groupId: "Região de Coimbra"	
	},
	{
		id: "PT-11",
		groupId: "Região de Coimbra"	
	},
	
	],
};

var C_NUTS2 = {
	map : "portugalRegionsLow",
	getAreasFromMap : true,
	zoomLevel: 2,
	areas: [ {
		id: "PT-L1",
		groupId: "Lisboa"
	},{
		id: "PT-L2",
		groupId: "Lisboa"	
	}],
};

var C_NUTS1 = {
	map : "worldLow",
	zoomLevel: 1,
	areas : [{
		id : "PT",
		color : "#CCCCCC",
		passZoomValuesToTarget : true
	}]

};

var C_map = AmCharts.makeChart("C_mapdiv", {
	type : "map",
	pathToImages : "http://www.ammap.com/lib/3/images/",
	panEventsEnabled : true,
	areasSettings : {
		autoZoom : false,
		rollOverOutlineColor : "#555555",
		selectedColor : "#5EB7DE",
		color : "#CCCCCC",
		colorSolid : "#5EB7DE",
		rollOverColor : "#9EC2F7",
		selectable : true
	},
	fitMapToContainer: true,
	
	dataProvider : C_NUTS1,
	smallMap : {},
	"responsive" : {
		"enabled" : true
	},
	mouseWheelZoomEnabled : true,
	zoomDuration : 0.3,
	zoomControl : {
		zoomControlEnabled : true,
		panControlEnabled : true
	},
	
});

function C_cleanSelection(){
	for (var i in C_map.dataProvider.areas) {
            var area = C_map.dataProvider.areas[i];
            if (area.showAsSelected) {
                states.push(area.title);
            }
    }
}

function C_refreshInfo(){
	 // let's build a list of currently selected states
        C_selectedRegions = [];
        for (var i in C_map.dataProvider.areas) {
            var area = C_map.dataProvider.areas[i];
            if (area.showAsSelected) {
                C_selectedRegions.push(area.title);
            }
        }
       // alert("Selected states:<br />" + (states.length ? states.join(", ") : "none"));
       // alert(document.getElementById("mapdiv")); 
      
        var elem = $("#C_info")[0];
        // alert(elem);
        elem.innerHTML = "Selected Regions:<br />" + (C_selectedRegions.length ? C_selectedRegions.join(", ") : "none");
}

function C_changeToNUTS1() {
	C_map.dataProvider = C_NUTS1;
	C_map.validateData();
}

function C_changeToNUTS2() {
	C_map.dataProvider = C_NUTS2;
	C_map.validateData();
}

function C_changeToNUTS3() {
	C_map.dataProvider = C_NUTS3;
	C_map.validateData();
}

function C_changeToCities() {
	C_map.selectedObject = C_map.dataProvider;
	C_map.dataProvider = C_cities;
	C_map.validateData();
}	


function C_handleGoHome() {
	C_map.dataProvider = NUTS1;
	C_map.validateNow();
}

function C_handleMapObjectClick(event) {
	if (event.mapObject.id == "backButton") {
		C_handleGoHome();
	}
}

// monitor when home icon was clicked and also go to continents map

C_map.addListener("homeButtonClicked", C_handleGoHome);
C_map.addListener('clickMapObject', function (event) {
        //C_handleMapObjectClick();
        // deselect the area by assigning all of the dataProvider as selected object
        //C_map.selectedObject = C_map.dataProvider;
        
        // toggle showAsSelected
        event.mapObject.showAsSelected = !event.mapObject.showAsSelected;
        
        // bring it to an appropriate color
        C_map.returnInitialColor(event.mapObject);
        
        C_refreshInfo();
        
        //clickMapObject(mapObject) ccionar o click
        //zoomToSelectedObject(mapObject) zoom para o objecto seleccionado
});
