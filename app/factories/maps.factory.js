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
                    // console.log("data from getLocation", data);
                    console.log("location from Geolocation set to: ", data.data.location);
                    // console.log("location accuracy is: ", data.data.accuracy, " meters");
                    setUserLocation("location", data.data.location);
                    setUserLocationAccuracy("location-accuracy", data.data.accuracy);
                    resolve(data.data);
                    
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
                    resolve(data.data);
                    
                });

            });

        };

    const getCountyByCoordinates = function(lat, long) {
            return $q((resolve, reject) => {
                console.log("lat/long coordinates in getCountyByCoordinates: ", lat, long);
                let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyBDlKPuHFqkczwxL-0p-SJ5UyCskYUdp0g`;
                console.log("url in getCountyByCoordinates: ", url);
                $http.post(url)
                .then((data) => {
                    console.log("data from getCountyByCoordinates", data);
                    let addressComponentsArray = data.data.results[0].address_components;
                    let county = "";
                    console.log("components ", addressComponentsArray);
                    for (let i = 0; i < addressComponentsArray.length; i++) {
                        console.log("addressComponentsArray[i]", addressComponentsArray[i].long_name);
                        console.log("includes t/f", addressComponentsArray[i].long_name.toLowerCase().includes("county"));
                        if (addressComponentsArray[i].long_name.toLowerCase().includes("county")) {
                            county = addressComponentsArray[i].long_name;
                            console.log("county in if statement: ", county);
                            break;
                        }
                    }
                    resolve(county);
                });

            });


    };
    



    return {getGeoLocation, setUserLocation, getUserLocation, removeUserLocation, setUserLocationAccuracy, 
            getUserLocationAccuracy, removeUserLocationAccuracy, getLocationByAddress, getCountyByCoordinates};

});