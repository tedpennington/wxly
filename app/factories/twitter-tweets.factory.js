"use strict";

/*

 */

app.factory("twitterTweetsFactory", function($q, $http, FBCreds, twitterUserFactory){

    const getLatestTweets = function(maxId, county){
            //create deferred object
            var deferred = $q.defer();
            //user timeline:
            // var url = '/1.1/statuses/home_timeline.json';
            var url = '1.1/search/tweets.json?q=' + county;
            console.log('url', url);
            if (maxId) {
                url +=  '?max_id=' + maxId;
            }
            // *****  Why are we doing .get on authorizationResult?? **********
            var promise = twitterUserFactory.isReady().get(url).done(function(data) {
                let statuses = data.statuses;
                //Convert all the Twitter timestamps to js dates
                statuses.forEach(function(status){
                    status.created_at = new Date(Date.parse(status.created_at.replace(/( \+)/, ' UTC$1')));
                });
                //when the data is retrieved, resolve the deferred object
                deferred.resolve(statuses);
            });
            //return the deferred promise
            return deferred.promise;
        };
    



    return {getLatestTweets};

});