"use strict";

app.controller("homeCtrl", function($scope, twitterTweetsFactory, twitterUserFactory, fbUserFactory, filterFactory, $rootScope, $route, $routeParams){

	$scope.searchText = filterFactory;  

	//Get the logged in t/f value that is set in a factory (b/c set from nav controller, and read here)
	$scope.loggedIn = fbUserFactory.isLoggedInFB;
	console.log("$scope.loggedIn: ", $scope.loggedIn);

	// *** MAPS *** 

	// Creating Leaflet Map
	var mymap = L.map('mapid').setView([36.1325338, -86.7587529], 10);

	// Add Streets Tile Layer from Mapbox
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidGVkcGVubiIsImEiOiJjajdpM3pua3cxcDlvMnFxdXlhMDZxM3k0In0.ADAbkPtxltDATliAcRde1Q'
	}).addTo(mymap);

	// Add Radar Tile Layer from Aeris
	// Try won't catch error (yet?) because http call still returns response (doesn't throw error)
	// try {
		// L.tileLayer('https://maps.aerisapi.com/SG9I7hQDyk9aQlp1hOWPd_NeapmCClJqrFmnAntR8zm33nBadOLxyE1MqRn1hL/alerts,radar,stormcells/{z}/{x}/{y}/current.png', {
	 //    subdomains: '1234',
	 //    attribution: '&copy;AerisWeather',
		// }).addTo(mymap);
	// }
	// catch(error) {

		// L.Wunderground.radar(
	 //  {
	 //    appId: 'e344d5b95b258ce2',
	 //    apiRef: 'WXly'
	 //  }).addTo(mymap);
	
	

	// *** SPOTTER REPORTS SETTINGS CONTROLS

	$scope.tspotterChanged = function() {
		// console.log("$scope.tspotterValue", $scope.tspotterValue);
		$scope.tweets.length = 0;
		console.log("selected county in tspotterChanged: ", $scope.selectedCounty);
		if (!$scope.selectedCounty) {
			console.log("IT WAS NULL");
			$scope.selectedCounty = "%40nashseverewx";
		}
		$scope.refreshTimeline(null, $scope.selectedCounty, $scope.tspotterValue, $scope.searchText.search);
	};

	$scope.selectCounty = function() {
		// console.log("You selected this county: ", $scope.selectedCounty);
		$scope.tweets.length = 0;
		$scope.refreshTimeline(null, $scope.selectedCounty, $scope.tspotterValue, $scope.searchText.search);
	};

	$scope.doSearch = function() {
		$scope.tweets.length = 0;
		$scope.refreshTimeline(null, $scope.selectedCounty, $scope.tspotterValue, $scope.searchText.search);
	};

	
	// fbUserFactory.isAuthenticated()
	// .then((isAuth) => {
	// 	if(isAuth){
	// 		// console.log("fbUserFactory.getFirebaseId ", fbUserFactory.getFirebaseId());
	// 		fbUserFactory.getCurrentUserFullObj(fbUserFactory.getFirebaseId())
	// 		.then((userObj) => {
	// 			// Set the displayed county to the user's county
	// 			$scope.selectedCounty = userObj.county;
	// 			// Empty out the tweets array
	// 			$scope.tweets = [];
	// 			// Refresh timeline based on user's county (which is now shown in select)
	// 			$scope.refreshTimeline(null, $scope.selectedCounty, $scope.tspotterValue);
	// 			//Maybe this
	// 			//$window.location.href = "#!/profile";
	// 			// $route.reload();


	// 		});
	// 	}else{
	// 		//Do the stuff for when no user is logged in (refresh timeline w/ NashSeverWX data)
	// 	}

	// });
	

	// *** TWEETS ***
	//Create array to hold tweets.
	$scope.tweets = [];

	$scope.refreshTimeline = function(maxId, county, onlyTspotter, searchTerm){


		//using the OAuth authorization result get the latest 20 tweets from twitter for the user
		twitterTweetsFactory.getLatestTweets(maxId, county, onlyTspotter, searchTerm).then(function(data) {
			console.log("data to populate tweets arr", data);
			for (let i = 0; i < data.length; i++){
				// console.log("this ONE: ", data[i]);
				if(data[i].coordinates !== null){
					console.log("making a marker, or should be");
					console.log("coordinates to marker", data[i].coordinates.coordinates[0],data[i].coordinates.coordinates[1]);
					L.marker([data[i].coordinates.coordinates[1],data[i].coordinates.coordinates[0]]).addTo(mymap)
	        		.bindPopup(`<strong>From: ${data[i].user.name}:</strong><br> ${data[i].text}<br><small>at ${data[i].created_at}</small>`)
	        		.openPopup();
	        	}
			}
			$scope.tweets = $scope.tweets.concat(data);
		}, function() { // ***** What is this function??  Error handler as second arg to .then?? ***
			$scope.rateLimitError = true;
		});
	};

	// console.log("twitterUserFactory.isReady()", twitterUserFactory.isReady());
	if (twitterUserFactory.isReady()){
		console.log("it's ready");
        $scope.connectedTwitter = true;
        	fbUserFactory.isAuthenticated()
			.then((isAuth) => {
				if(isAuth){
					// console.log("fbUserFactory.getFirebaseId ", fbUserFactory.getFirebaseId());
					fbUserFactory.getCurrentUserFullObj(fbUserFactory.getFirebaseId())
					.then((userObj) => {
						// Set the displayed county to the user's county
						$scope.selectedCounty = userObj.county;
						// Empty out the tweets array
						$scope.tweets = [];
						// Refresh timeline based on user's county (which is now shown in select)
						$scope.refreshTimeline(null, $scope.selectedCounty, $scope.tspotterValue);
						//Maybe this
						//$window.location.href = "#!/profile";
						// $route.reload();
						});
				}else{
					//Do the stuff for when no user is logged in (refresh timeline w/ NashSeverWX data)
					// Empty out the tweets array
					$scope.tweets = [];
					$scope.refreshTimeline(null, "%40nashseverewx");

				}

			});
    	}
	 









});