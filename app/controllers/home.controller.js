"use strict";

app.controller("homeCtrl", function($scope){

	// Creating Leaflet Map
	var mymap = L.map('mapid').setView([36.1325338, -86.7587529], 12);

	// Add Streets Tile Layer
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidGVkcGVubiIsImEiOiJjajdpM3pua3cxcDlvMnFxdXlhMDZxM3k0In0.ADAbkPtxltDATliAcRde1Q'
	}).addTo(mymap);

	// Add Radar Tile Layer
	L.tileLayer('https://maps.aerisapi.com/SG9I7hQDyk9aQlp1hOWPd_NeapmCClJqrFmnAntR8zm33nBadOLxyE1MqRn1hL/alerts,radar,stormcells/{z}/{x}/{y}/current.png', {
    subdomains: '1234',
    attribution: '&copy;AerisWeather',
}).addTo(mymap);

});