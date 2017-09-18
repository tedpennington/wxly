"use strict";

/*

 */

app.factory("mapsFactory", function($q, $http, $window){

    const setUserLocation = function (key, value) {
        $window.localStorage.setItem(key,value);
    };

    const getUserLocation = function (key) {
        let result = $window.localStorage.getItem(key);
        return result;
    };

    const removeUserLocation = function (key) {
        $window.localStorage.removeItem(key);
    };

    const setUserLocationAccuracy = function (key, value) {
        $window.localStorage.setItem(key,value);
    };

    const getUserLocationAccuracy = function (key) {
        let result = $window.localStorage.getItem(key);
        return result;
    };

    const removeUserLocationAccuracy = function (key) {
        $window.localStorage.removeItem(key);
    };


    const getGeoLocation = function(){
            return $q((resolve, reject) => {
                $http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBDlKPuHFqkczwxL-0p-SJ5UyCskYUdp0g')
                .then((data) => {
                    console.log("data from getLocation", data);
                    console.log("location set to: ", data.data.location);
                    console.log("location accuracy is: ", data.data.accuracy, " meters");
                    setUserLocation("location", data.data.location);
                    setUserLocationAccuracy("location-accuracy", data.data.accuracy);
                    
                });

            });

        };


    const getLocationByAddress = function(address){
            return $q((resolve, reject) => {
                console.log("address being searched: ", address);
                let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBDlKPuHFqkczwxL-0p-SJ5UyCskYUdp0g`;
                console.log("url: ", url);
                $http.post(url)
                .then((data) => {
                    console.log("data from getLocationByAddress", data);
                    // setUserLocation("location", data.data.location);
                    // setUserLocationAccuracy("location-accuracy", data.data.accuracy);
                    
                });

            });

        };
    



    return {getGeoLocation, setUserLocation, getUserLocation, removeUserLocation, setUserLocationAccuracy, 
            getUserLocationAccuracy, removeUserLocationAccuracy, getLocationByAddress};

});