var compare_map= new function(){
	var selectedRegions=[];
	var cities = {
		map : "portugalLow",
		getAreasFromMap : true,
		zoomLevel : 1,
	};
	
	var NUTS3 = {
		map : "continentsLow",
		getAreasFromMap : true,
		zoomLevel: 1,
		areas: [ {
			id: "207",
			groupId: "Lisboa"
		},{
			id: "207_1",
			groupId: "Lisboa"	
		},
		{
			id: "190",
			groupId: "Beiras e Serra da Estrela"	
		},
		{
			id: "190_1",
			groupId: "Beiras e Serra da Estrela"	
		},
		{
			id: "190_2",
			groupId: "Beiras e Serra da Estrela"	
		},
		{
			id: "169_1",
			groupId: "Beira Baixa"	
		},
		{
			id: "169",
			groupId: "Beira Baixa"	
		},
		{
			id: "123",
			groupId: "Região de Coimbra"	
		},
		{
			id: "123_1",
			groupId: "Região de Coimbra"	
		},
		{
			id: "30_1",
			groupId: "Porto"
		},
		{
			id: "30",
			groupId: "Porto"
		}
		
		],
	};
	
	var NUTS2 = {
		map : "portugalRegionsLow",
		getAreasFromMap : true,
		zoomLevel: 1,
		areas: [ {
			id: "206",
			groupId: "Lisboa"
		},{
			id: "206_1",
			groupId: "Lisboa"	
		}],
	};
	
	var NUTS1 = {
		map : "worldLow",
		zoomLevel: 1,
		areas : [{
			id : "0",
			color : "#CCCCCC",
			passZoomValuesToTarget : true
		}]
	
	};
	
	var map = AmCharts.makeChart("C_mapdiv", {
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
		
		dataProvider : NUTS1,
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
	
	function cleanSelection(){
		for (var i in map.dataProvider.areas) {
	            var area = map.dataProvider.areas[i];
	            if (area.showAsSelected) {
	                states.push(area.title);
	            }
	    }
	}
	
	function refreshInfo(){
		 // let's build a list of currently selected states
	        selectedRegions = [];
	        for (var i in map.dataProvider.areas) {
	            var area = map.dataProvider.areas[i];
	            if (area.showAsSelected) {
	                selectedRegions.push(area.title);
	            }
	        }
	       // alert("Selected states:<br />" + (states.length ? states.join(", ") : "none"));
	       // alert(document.getElementById("mapdiv")); 
	      
	        // var elem = $("#info")[0];
	        // // alert(elem);
	        // elem.innerHTML = "Selected Regions:<br />" + (selectedRegions.length ? selectedRegions.join(", ") : "none");
	}
	
	this.changeToNUTS1 =function() {
		map.dataProvider = NUTS1;
		map.validateData();
	};
	
	this.changeToNUTS2 =function() {
		map.dataProvider = NUTS2;
		map.validateData();
	};
	
	this.changeToNUTS3 =function() {
		map.dataProvider = NUTS3;
		map.validateData();
	};
	
	this.changeToCities =function() {
		map.selectedObject = map.dataProvider;
		map.dataProvider = cities;
		map.validateData();
	};	
	
	
	function handleGoHome() {
		map.dataProvider = NUTS1;
		map.validateNow();
	}
	
	function handleMapObjectClick(event) {
		if (event.mapObject.id == "backButton") {
			handleGoHome();
		}
	}
	
	// monitor when home icon was clicked and also go to continents map
	
	map.addListener("homeButtonClicked", handleGoHome);
	map.addListener('clickMapObject', function (event) {
	        //handleMapObjectClick();
	        // deselect the area by assigning all of the dataProvider as selected object
	        //map.selectedObject = map.dataProvider;
	        
	       
	        var id=event.mapObject.id.split("_");
	        id=id[0];
	        console.log(id);
	     	if(id=="30" || id=="123" || id=="169" || id=="190" || id=="207" || id=="206"){
	     		var mapObject = map.getObjectById(id);
	     		 mapObject.showAsSelected = !mapObject.showAsSelected;
	       		 map.returnInitialColor(mapObject);
	       		 
	       		 mapObject = map.getObjectById(id+"_1");
	     		 mapObject.showAsSelected = !mapObject.showAsSelected;
	       		 map.returnInitialColor(mapObject);
	       		 
	       		 if(id=="190"){
	       		 	 mapObject = map.getObjectById(id+"_2");
	     			 mapObject.showAsSelected = !mapObject.showAsSelected;
	       			 map.returnInitialColor(mapObject);
	       		 }	       		 
	       		 
	     	}else{
	     		 // toggle showAsSelected
	       		 event.mapObject.showAsSelected = !event.mapObject.showAsSelected;
	       		 // bring it to an appropriate color
	       		 map.returnInitialColor(event.mapObject);
	     	}
	        
	        refreshInfo();
	        
	        //clickMapObject(mapObject) ccionar o click
	        //zoomToSelectedObject(mapObject) zoom para o objecto seleccionado
	});
};