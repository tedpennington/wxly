"use strict";
// having $window injected forces reload of page
app.controller("navCtrl", function ($scope, $window, fbUserFactory, twitterUserFactory, $location, $route, $routeParams, $timeout, filterFactory) {
    $scope.searchText = filterFactory;
    
    // let $scope.isLoggedIn;

    // On page load, try to get displayName value (null if logged out, np)

    fbUserFactory.getCurrentUserFullObj(fbUserFactory.getFirebaseId())
                    .then((userObj) => {
                        if(userObj){
                            console.log("userObj on NavCtrl page load", userObj);
                            $scope.displayName = userObj.displayName;
                        }else {
                            console.log("No user logged in");
                        }
                    });


    //Initialize Toastr Options:
    toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
    };

    

    //Initialize OAuth
    twitterUserFactory.initialize();

//When login is clicked, log user into Firebase using Twitter, then log user into Twitter itself.
$scope.login = () => {
    console.log("you clicked on login and login function is running");
    fbUserFactory.authWithProvider()
    .then((result) => {
        console.log("result", result);
        let user = result.user.uid;
        // $location.path("/home");
        addUser();
        // $scope.$apply();
        console.log("login .then ran");
        twitterUserFactory.connectTwitter()
        .then(function(dataFromConnect) {
            if (twitterUserFactory.isReady()) {
                console.log("connected to Twitter", "dataFromConnect :", dataFromConnect);
                toastr.success("You are now logged in, and connected to Twitter!", "Login | Connected to Twitter");
                //     $scope.refreshTimeline();
                $scope.connectedTwitter = true;
                $window.location.href = "#!/home";
                $route.reload();
                // });
            } else {

                 }
        });
    })
    .catch((error) => {
        console.log("error with Twitter login");
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("error", error); 
    });
    };

    // Upon login, addUser checks to see if user is already in FB.  If not, it directs user to a form to add themselves.
    function addUser(){
        fbUserFactory.getFBCurrentUser()
        .then( (user) => {
            console.log("****user in addUser****", user);
            // console.log("fbUserFactory.userIsInFirebase(user.uid) in addUser", fbUserFactory.userIsInFirebase(user.uid));
            fbUserFactory.userIsInFirebase(user.uid)
            .then((isInFirebase) => {
                console.log("isInFirebase inside nested .then in addUser", isInFirebase);
                console.log("user in nested .then in addUser", user);
                console.log("user.email in nested .then in addUser", user.email);
                console.log("user.displayName", user.displayName);
                if(isInFirebase === false) {                                
                    let userObj = {
                        displayName: user.displayName,
                        uid: user.uid,
                        photoURL: user.photoURL,
                        email: user.email,
                        roleValue: 20
                        };
                    console.log("userObj in addUser", userObj);
                    fbUserFactory.addUserToFirebase(userObj)
                    .then ((userObj) => {
                        $scope.displayName = userObj.displayName;
                    });
                    $window.location.href = "#!/home";
                    
                }else {
                    console.log("user already in firebase");
                    //update the local current user object
                    fbUserFactory.getCurrentUserFullObj(fbUserFactory.getFirebaseId())
                    .then((userObj) => {
                        $scope.displayName = userObj.displayName;
                    });
                    $window.location.href = "#!/home";
                    
                }
            });    
        });
    }





    //When logout button is clicked:
        $scope.logout = () => {
            fbUserFactory.logOut();
            twitterUserFactory.clearCache();
            // *** Need to clear array of tweets here***
            $scope.connectedTwitter = false;
            toastr.success("Logging you out!", "Logged Out");
            $timeout(function(){$window.location.href = "#!/home";}, 3000);
            
            };


        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.isLoggedIn = true;
            fbUserFactory.isLoggedInFB = true;
            // console.log("currentUser logged in?", user);
            console.log("logged in t-f", $scope.isLoggedIn );
            $scope.$apply();
            $route.reload();
        } else {
            $scope.isLoggedIn = false;
            fbUserFactory.isLoggedInFB = false;
            console.log("user logged in?", $scope.isLoggedIn);
            // $window.location.href = "#!/login";
        }
        }); 


    //when first loaded, make sure no one is logged in
    fbUserFactory.isAuthenticated();
  // if (fbUserFactory.isAuthenticated()){
  //   fbUserFactory.logOut();
  //   twitterUserFactory.clearCache();
  //   $scope.connectedTwitter = false;
  // }



});