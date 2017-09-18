"use strict";

app.controller('addReportCtrl', function($scope, twitterTweetsFactory, mapsFactory, NgMap){

	// Get the user's Geolocation:
	mapsFactory.getGeoLocation();

	// Build the address from form:
	$scope.submitReport = function() {
	$scope.addressString = "";

	if($scope.addressStreet !== null){
	$scope.addressString += `${$scope.addressStreet} `;
	}

	if($scope.addressCity !== null){
	$scope.addressString += `${$scope.addressCity} `;
	}

	if($scope.addressState !== null){
	$scope.addressString += `${$scope.addressState} `;
	}

	if($scope.addressZip !== null){
	$scope.addressString += `${$scope.addressZip} `;
	}


	// Submit the address from form to get coordinates
	mapsFactory.getLocationByAddress($scope.addressString);
	// .then(())
	};

	NgMap.getMap().then(function(map) {
    console.log("map.getCenter()", map.getCenter());
    // console.log('markers', map.markers);
    // console.log('shapes', map.shapes);
    
   	});

   	$scope.getCurrentLocation = function(event){
        console.log(event.latLng.lat());
        console.log(event.latLng.lng());
  	};



	// Display Map example to emulate:
	// var map;
	// function initialize() {
	//     var myLatlng = new google.maps.LatLng(40.713956, -74.006653);
	//     var myOptions = {
	//         zoom: 8,
	//         center: myLatlng,
	//         mapTypeId: google.maps.MapTypeId.ROADMAP
	//     };
	//     map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	//     var marker = new google.maps.Marker({
	//         draggable: true,
	//         position: myLatlng,
	//         map: map,
	//         title: "Your location"
	//     });
	//     google.maps.event.addListener(marker, 'dragend', function (event) {
	//         document.getElementById("lat").value = event.latLng.lat();
	//         document.getElementById("long").value = event.latLng.lng();
	//         infoWindow.open(map, marker);
	//     });
	// }
	// google.maps.event.addDomListener(window, "load", initialize());







});