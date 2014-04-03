var geocoder;

$(document).ready(function() {
      geocoder = new google.maps.Geocoder();
});

var getCurrentPosition = function() {
	
	$('#lblLatitude').html("Getting Location...");
	$('#lblLongitude').html("");
    $('#lblAccuracy').html("");
    $('#lblLocation').html("");
	
	var options = 
    {
  		enableHighAccuracy: true,
  		timeout: 10000,
  		maximumAge: 0
	};

	var success = function (position) 
	{
		var latitude = parseFloat(position.coords.latitude);
     	var longitude = parseFloat(position.coords.longitude);
     	var accuracy = parseFloat(position.coords.accuracy); 
		                       
      	var latlng = new google.maps.LatLng(latitude, longitude);
                        
      	geocoder.geocode({'latLng': latlng}, function(results, status) {      		
        	if (status == google.maps.GeocoderStatus.OK) 
        	{
         		if (results[0]) 
          		{
          			var location = results[0].formatted_address;
          			//alert(location);
          			
          			$('#lblLatitude').html("Latitude: " +latitude);
          			$('#lblLongitude').html("Longitude: " +longitude);
          			$('#lblAccuracy').html("Accuracy: " +accuracy +"m");
          			$('#lblLocation').html("Location.. <br/>" +location);
          			
            		// var arrAddress = results[0].address_components;
            		// iterate through address_component array
            		// $.each(arrAddress, function (i, address_component){              		
              			// if (address_component.types[0] == "locality"){           		
              	     	// console.log(address_component.long_name); // city
                		// alert(address_component.long_name);
                		// return false; // break
              	// }
            // });
          } else {
            alert("No results found");
            $('#lblLatitude').html("");
          }
        } else {
          alert("Geocoder failed due to: " + status);
          $('#lblLatitude').html("");
        }
      });
	};

	var failure = function (error) 
	{
  		alert('ERROR(' + error.code + '): ' + error.message);
  		$('#lblLatitude').html("");
  		$('#lblLongitude').html("");
    	$('#lblAccuracy').html("");
    	$('#lblLocation').html("");
	};
	
	navigator.geolocation.getCurrentPosition(success, failure, options);
	
};