"use strict";

angular.module('WXly.services', []).factory('twitterService', function($q) {

    var authorizationResult = false;

    return {
        initialize: function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('H700ZZgDrOsPopl4RBHmJ3DVVLg', {cache:true});
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('twitter');
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error

                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getLatestTweets: function (maxId) {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
      			var url='/1.1/search/tweets.json?q=%40nashseverewx%20%23tspotter';
                // var url='/1.1/search/tweets.json?q=tedpennington';
      			if(maxId){
      				url+='?max_id='+maxId;
      			}
            var promise = authorizationResult.get(url).done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                //when the data is retrieved resolve the deferred object
                        // console.log("data:", data);
                        var deeper = data.statuses;
                        console.log("deeper",deeper);
				        deferred.resolve(deeper);
            }).fail(function(err) {
               //in case of any error we reject the promise with the error object
                deferred.reject(err);
            });
            //return the promise of the deferred object
            return deferred.promise;
        }
    };

});
