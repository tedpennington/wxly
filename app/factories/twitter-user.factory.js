"use strict";

/*

 */

app.factory("twitterUserFactory", function($q, $http, FBCreds){

    var authorizationResult = false;

    const initialize = function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('H700ZZgDrOsPopl4RBHmJ3DVVLg', {cache:true});
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('twitter');
        };

    const isReady = function() {
            return (authorizationResult);
        };

    const connectTwitter = function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve(result);
                } else {
                    //do something if there's an error

                }
            });
            return deferred.promise;
        };
   const clearCache = function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        };




    return {initialize, connectTwitter, isReady, clearCache};

});