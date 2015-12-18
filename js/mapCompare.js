var compare_map= new function(){
	var selectedRegions=[];
	var currentNUT=1;
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
	
	function refreshInfo(id){
		var index= selectedRegions.indexOf(id);
		var elem = $("#selectedNUTSCompare")[0];
			var txt=elem.innerHTML;
			var selection= txt.split(",");
			//console.log(selection);
		
		if(index > -1){
			selectedRegions.splice(index, 1);
			for(var i=0; i<selection.length; i++){
				if(selection[i]==id){
					selection.splice(i, 1);
					elem.innerHTML=selection;
					$.getScript("js/compare.js");
				}
				
			}
			
		}else{
			
            //elem.innerHTML = id;
			selectedRegions.push(id);
			
			for(var i=0; i<selection.length; i++){
				if(selection[i]==id)
					return;
			}
			selection.unshift(id);
			if(selection.length>5)
				selection.pop();
			
			//console.log(selection);
			elem.innerHTML=selection;
			$.getScript("js/compare.js");
			
		}
		//console.log(selectedRegions);
		
	}
	
	this.mapSelection = function(in_id){
		 var id=in_id.split("_");
	        id=id[0];
	        	
	       // console.log(id);
	        if(selectedRegions.length == 1 && selectedRegions[0]==id)
	        	return;
	        
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
	     		var mapObject = map.getObjectById(id);
	     		 mapObject.showAsSelected = !mapObject.showAsSelected;
	       		 map.returnInitialColor(mapObject);
	     	}
	        
	        refreshInfo(id);
	       
	};
	
	this.changeToNUTS1 =function() {
		map.dataProvider = NUTS1;
		map.validateData();
		currentNUT=1;
	};
	
	this.changeToNUTS2 =function() {
		map.dataProvider = NUTS2;
		map.validateData();
		currentNUT=2;
	};
	
	this.changeToNUTS3 =function() {
		map.dataProvider = NUTS3;
		map.validateData();
		currentNUT=3;
	};
	
	this.changeToCities =function() {
		//map.selectedObject = map.dataProvider;
		map.dataProvider = cities;
		map.validateData();
		currentNUT=4;
	};	
	
		
	this.selectFromAnyRegion = function(regionType, id){
		
		if((regionType=="NUTS I " || regionType=="NUTS 2013 ") && currentNUT!=1){
			compare_map.changeToNUTS1();
		}else{
			if(regionType=="NUTS II " && currentNUT!=2){
				compare_map.changeToNUTS2();
			}else{
				if(regionType == "NUTS III " && currentNUT!=3){
					compare_map.changeToNUTS3();
				}else{
					if(regionType == "Município " && currentNUT!=4){
						compare_map.changeToCities();
					}
				}
			}
		}
		if(id=="1"){
			id="0";
		}	
		compare_map.mapSelection(id);
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
	        	
	       // console.log(id);
	        if(selectedRegions.length == 1 && selectedRegions[0]==id)
	        	return;
	        
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
	        
	        refreshInfo(id);
	        
	        //clickMapObject(mapObject) ccionar o click
	        //zoomToSelectedObject(mapObject) zoom para o objecto seleccionado
	});
};
setTimeout(function(){ compare_map.selectFromAnyRegion("NUTS I ","0"); }, 1000);
//setTimeout(function(){ compare_map.selectFromAnyRegion("NUTS II ","206"); }, 10000);

