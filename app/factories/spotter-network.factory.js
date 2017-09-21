"use strict";

/*
Need to link this factory and finish
 */

app.factory("twitterTweetsFactory", function($q, $http, FBCreds, twitterUserFactory){

    const loginSpotterNetwork = function (username, password) {
        return $q ((resolve, reject) => {
            $http({
                method: 'POST',
                url: "https://www.spotternetwork.org/login",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "username": username,
                    "password": password
                }

            });


        });
    };

    // const getLatestTweets = function(maxId, county, onlyTspotter){
    //         //create deferred object
    //         var deferred = $q.defer();
    //         //user timeline:
    //         // var url = '/1.1/statuses/home_timeline.json';
    //         var url = '1.1/search/tweets.json?q=' + county;
    //         if (onlyTspotter) {
    //             url += '%20%23tspotter';
    //         }
    //         console.log('url', url);
    //         if (maxId) {
    //             url +=  '?max_id=' + maxId;
    //         }
    //         // *****  Why are we doing .get on authorizationResult?? **********
    //         var promise = twitterUserFactory.isReady().get(url).done(function(data) {
    //             let statuses = data.statuses;
    //             //Convert all the Twitter timestamps to js dates
    //             statuses.forEach(function(status){
    //                 status.created_at = new Date(Date.parse(status.created_at.replace(/( \+)/, ' UTC$1')));
    //             });
    //             //when the data is retrieved, resolve the deferred object
    //             deferred.resolve(statuses);
    //         });
    //         //return the deferred promise
    //         return deferred.promise;
    //     };
    

    // const postTweet = function (status, lat, long, county, tspotter) {
    //     console.log("status in postTweet", status, "length: ", status.length);
    //     let url = `https://api.twitter.com/1.1/statuses/update.json?`;
    //     if(status){
    //         url += `status=${status}`;
    //     }
    //     if(tspotter){
    //         url += `%20%23tspotter`;
    //     }
    //     url += `%20${county}`;
    //     if(lat){
    //         url += `&lat=${lat}&long=${long}&display_coordinates=true`;
    //     }
    //     url = url.replace(/ /g, "%20");

    //     console.log("postTweet URL: ", url);

    //     return $q((resolve, reject) => {
    //         twitterUserFactory.isReady().post(url).done(function(data) {
    //             console.log("data from postTweet: ", data);
    //             resolve(data);
    //             })
    //             .fail((error) => {
    //                 console.log("error from post: ", error);
    //             });
    //     });

    // };
    




    return {loginSpotterNetwork};

});