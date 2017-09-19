"use strict";

app.controller('addReportCtrl', function($scope, twitterTweetsFactory, mapsFactory, NgMap){

	// Get the user's Geolocation:
	mapsFactory.getGeoLocation()
	.then((data) => {
		console.log("data.location: ", data.location);
		$scope.latitude = data.location.lat;
		$scope.longitude = data.location.lng;
		// toastr.success("Your geolocation has been found!  See map below to refine.", "Geolocation:");
		// *** 	WHY IS THIS CONTROLLER LOADING TWICE (CAUSING 2 TOAST NOTIFS)???? ***
		// console.log("$scope.latitude", $scope.latitude);

	});

	//*********************************

	// Build the address from form:
	$scope.submitAddress = function() {
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
		mapsFactory.getLocationByAddress($scope.addressString)
		.then((data) => {
			console.log("data from get by address in .then: ", data);
			$scope.latitude = data.results[0].geometry.location.lat;
			$scope.longitude = data.results[0].geometry.location.lng;
		});
		};



	$scope.submitIntersection = function() {
		$scope.addressString = "";

		if($scope.interesectionStreet1 !== null){
		$scope.addressString += `${$scope.interesectionStreet1} `;
		}

		if($scope.interesectionStreet2 !== null){
		$scope.addressString += `and ${$scope.interesectionStreet2} `;
		}

		if($scope.intersectionCity !== null){
		$scope.addressString += `${$scope.intersectionCity} `;
		}

		if($scope.intersectionState !== null){
		$scope.addressString += `${$scope.intersectionState}`;
		}

		// Submit the address from form to get coordinates
		mapsFactory.getLocationByAddress($scope.addressString)
		.then((data) => {
			console.log("data from get by address in .then: ", data);
			$scope.latitude = data.results[0].geometry.location.lat;
			$scope.longitude = data.results[0].geometry.location.lng;
		});
		};

	//**************************************

	// NgMap.getMap().then(function(map) {
 //    // console.log("map.getCenter()", map.getCenter());
 //    // console.log('markers', map.markers);
 //    // console.log('shapes', map.shapes);
    
   	// });

   	$scope.getCurrentLocation = function(event){
   		$scope.latitude = event.latLng.lat();
   		$scope.longitude = event.latLng.lng();
        console.log(event.latLng.lat());
        console.log(event.latLng.lng());
  	};



	// *********************************************

	// Report Details
	//Defaults for controls:
	$scope.locateSelect ='currentMapPosition';
	$scope.season = "severe";
	

	$scope.getCounty = function() {
		mapsFactory.getCountyByCoordinates($scope.latitude, $scope.longitude)
		.then((county) => {
			console.log("County is: ", county);
			switch(true) {
					case (county.toLowerCase().includes("davidson") || county.toLowerCase().includes("williamson")):
						$scope.reportCounty = "%40nashseverewx";
						console.log("switch case", $scope.reportCounty);
						break;
					case county.toLowerCase().includes("bedford"):
						$scope.reportCounty = "%40bedfordseverewx";
						break;
					case county.toLowerCase().includes("cheatham"):
						$scope.reportCounty = "%40cheathmseverewx";
						break;
					case county.toLowerCase().includes("coffee"):
						$scope.reportCounty = "%40coffeeseverewx";
						break;
					case county.toLowerCase().includes("dickson"):
						$scope.reportCounty = "%40dicksonseverewx";
						break;
					case county.toLowerCase().includes("hickman"):
						$scope.reportCounty = "%40hickmanseverewx";
						break;
					case county.toLowerCase().includes("lawrence"):
						$scope.reportCounty = "%40lawrencesvrewx";
						break;
					case county.toLowerCase().includes("macon"):
						$scope.reportCounty = "%40maconseverewx";
						break;
					case county.toLowerCase().includes("marshal"):
						$scope.reportCounty = "%40marshseverewx";
						break;
					case county.toLowerCase().includes("maury"):
						$scope.reportCounty = "%40mauryseverewx";
						break;
					case county.toLowerCase().includes("montgomery"):
						$scope.reportCounty = "%40montcoseverewx";
						break;
					case county.toLowerCase().includes("overton"):
						$scope.reportCounty = "%40overtonseverewx";
						break;
					case county.toLowerCase().includes("putnam"):
						$scope.reportCounty = "%40putnamseverewx";
						break;
					case county.toLowerCase().includes("robertson"):
						$scope.reportCounty = "%40robcoseverewx";
						break;
					case county.toLowerCase().includes("rutherford"):
						$scope.reportCounty = "%40ruthseverewx";
						break;
					case county.toLowerCase().includes("smith"):
						$scope.reportCounty = "%40smithcountywx";
						break;
					case county.toLowerCase().includes("sumner"):
						$scope.reportCounty = "%40sumnerseverewx";
						break;
					case county.toLowerCase().includes("trousdale"):
						$scope.reportCounty = "%40trousdalewx";
						break;
					case county.toLowerCase().includes("wilson"):
						$scope.reportCounty = "%40wilsonseverewx";
						break;
					}
				console.log("reportCount is: ", $scope.reportCounty);

		});
	};







});