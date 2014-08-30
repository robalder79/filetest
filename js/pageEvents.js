$(document).ready(function(){
	
	$(function(){ FastClick.attach(document.body); });
	
/*	0. load property listings from json data file (alt database via php)
	1. onclick event to activate the slide panel
	2. load content for the slide panel from json data file (alt database via php)
	3. loop through images directory to create thumbs/gallery
*/
	
	$.getJSON("appData/data.json", function(data){
		
		var i;
		$.each(data.listedProperties, function(index, value){
			
			i = index + 1;
			
			$("#property-listings").append(
				"<li class='listed-property col col5' data-index='" + i + "'>" +
					"<div class='property-image'><img src='" + value.imagesDir + value.heroImage + "' /></div>" +
					"<div>" + value.address + "</div>" +
				"</li>"
			);
			
		});
		
		$(".property-image").height($(".listed-property").width()*0.67);
		
	});
	
	$("#property-listings").on('click', 'li',  function(){
		var listingIndex = $(this).attr("data-index");
		
		$.getJSON("appData/data.json", function(data){
		
			$.each(data.listedProperties, function(index, value){
				
				if((index+1) == listingIndex){
					
					$("#hero-image").css("background-image", "url(" + value.imagesDir + value.heroImage + ")");
					
					var html = "";
					for(i=1; i<value.numImages; i++){
						html += "<li class='gallery-image col col5'><img src='" + value.imagesDir + "00" + i + ".jpg' /></li>";
					}
					
					$("#slide-panel").append(
						"<h2>" + value.address + "</h2>" +
						"<div class='property-price'>$" + value.price + "</div>" +
						"<div class='property-info'><strong>Beds:</strong> " + value.beds + " <strong>Baths:</strong> " + value.baths + " <strong>Cars:</strong> " + value.cars + " <strong>Size:</strong> " + value.size + "</div>" +
						"<ul class='property-gallery'>" + html + "</ul>"
					);
					
				}
				
			});
			
		});
		
		$("#hero-image").fadeIn();
		$("#slide-panel").addClass("slide-in");
	});
	
	$("#slide-panel").on('click', function(){
		
		$("#hero-image").fadeOut();
		$("#slide-panel").removeClass("slide-in");
		$("#slide-panel").html("");
		
	});
	
});
