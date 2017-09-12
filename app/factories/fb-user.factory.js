"use strict";

/*

    provide the basic auth functionality for firebase

 */

app.factory("fbUserFactory", function($q, $http, FBCreds){

    // This is just the user's UID from Firebase
    let currentUser = null;
    // This is the complete user object that comes back from Firebase
    let FBCurrentUser = null;
    let currentUserFullObj = null;

//Set up Twitter auth
    let provider = new firebase.auth.TwitterAuthProvider();

    let authWithProvider= function(){
        return firebase.auth().signInWithPopup(provider);
    };



    const getCurrentUser = function(){
        return currentUser;

    };

    //use the current user uid to get full user object from fb database
    const getCurrentUserFullObj = function(uid){
        return $q((resolve, reject) => {
            console.log("inside getCurrentUserFullObj");
            $http.get(`${FBCreds.databaseURL}/users/.json?orderBy="uid"&equalTo="${uid}"`)
            .then((data) => {
                // console.log("data in getCurrentUserFullObj", data);
                currentUserFullObj = data.data;
                let objectArr = [];
                    Object.keys(currentUserFullObj).forEach(function (key) {
                        objectArr.push(currentUserFullObj[key]);
                    });
                currentUserFullObj = objectArr[0];
                console.log("currentUserFullObj", currentUserFullObj);
                resolve(currentUserFullObj);
            });


        });
    };
    

    // const logIn = function(userObj){
    //     return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
    //         .catch(function(error){
    //         let errorCode = error.code;
    //         let errorMessage = error.message;
    //         console.log("error", errorCode, errorMessage);
    //     });

    // };


    const logOut = function(){
        console.log("logoutUser");
        return firebase.auth().signOut();

    };


    // const register = function(userObj){
    //     return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
    //     .catch(function(error){
    //         let errorCode = error.code;
    //         let errorMessage = error.message;
    //         console.log("error", errorCode, errorMessage);
    //     });

    // };

    const updateDisplayName = function (name){
        return new Promise ((resolve, reject) => { 
            firebase.auth().currentUser.updateProfile({
                displayName: name
            });
            resolve();
        });  
    };

/* The three functions below are used in sequence to:
1. Get the current logged in user from the auth side of FB,
2. Check and see if that user already exists in our Users collection, and if not,
3. Add them to our Users collection*/

// Gets the current user from the **Authentication/Users** section of Firebase (not our db section)
    const getFBCurrentUser = function () {
        // console.log("userFactory: isAuthenticated");
            return new Promise ((resolve, reject) => {
            firebase.auth().onAuthStateChanged( (user) => {
                    // console.log("user in getFBCurrentUser", user);
                    // let userTest = user;
                    // console.log("userTest", userTest);
                    // console.log("user.displayName", user.displayName);
                    FBCurrentUser = user;
                    // {
                    //     displayName: user.displayName,
                    //     uid: user.uid,
                    //     photoURL: user.photoURL
                    // };
                    // console.log("FBCurrentUser in getFBCurrentUser return 1**", FBCurrentUser);
                resolve(FBCurrentUser);
                });
            });
        };


    //Checks to see if user is already in Firebase "Users" collection
    const userIsInFirebase = function (uid) {
        //get all known users to check against
        // console.log("URL in userIsInFirebase: ", `${FBCreds.databaseURL}/users.json`);
        return new Promise ((resolve, reject) => {
            let isInFirebase = null;
            $http.get(`${FBCreds.databaseURL}/users.json`)
            .then((data) => {
                // console.log("data from userIsInFirebase", data.data);
                //If there are any users in the db (data.data!== null), then check to see if the passed user is in FB
                if (data.data !== null) {
                    let userObjects = data.data;
                    console.log("userObjects", userObjects);
                    let UIDArray = [];
                    Object.keys(userObjects).forEach(function (key) {
                        UIDArray.push(userObjects[key].uid);
                    });
                    // console.log("UIDArray", UIDArray);
                    for (let i = 0; i < UIDArray.length; i++) {
                        // console.log("UIDArray[i]: ", UIDArray[i], "uid: ", uid);
                        if (UIDArray[i] === uid) {
                            console.log("userIsInFirebase was true with value: ", uid);
                            isInFirebase = true;
                            break;
                        }else {
                            console.log("userIsInFirebase was false with value: ", uid);
                            isInFirebase = false;
                        }
                    }
                }else {
                    isInFirebase = false;
                }
                resolve(isInFirebase);
            });
        });
    };


    // Adds a user to Firebase Users collection.  Expects a preformed user object that gets made in getFBCurrentUser.
    const addUserToFirebase = function(userObj){
        let newObj = JSON.stringify(userObj);
        // console.log("URL is: ", `${FBCreds.databaseURL}/users.json`);
        return $http.post(`${FBCreds.databaseURL}/users.json`, newObj)
        .then((data) => {
            // console.log("added user data returned: ", data);
            console.log("user was added to firebase db!");
            return data;

        }, (error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error", errorCode, errorMessage);
        });
    };

    





    const isAuthenticated = function (){
        // console.log("userFactory: isAuthenticated");
        return new Promise ( (resolve, reject) => {
            firebase.auth().onAuthStateChanged( (user) => {
                if (user){
                    currentUser = user.uid;
                    // console.log("user", user.uid);
                    resolve(true);
                }else {
                    resolve(false);
                }
            });
        });
    };

    



    return {getCurrentUser, logOut, isAuthenticated, authWithProvider, updateDisplayName, userIsInFirebase, addUserToFirebase, getFBCurrentUser, getCurrentUserFullObj};

});